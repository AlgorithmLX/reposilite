/*
 * Copyright (c) 2023 dzikoysk
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.reposilite.storage.filesystem

import com.reposilite.journalist.Journalist
import com.reposilite.shared.ErrorResponse
import com.reposilite.shared.badRequest
import com.reposilite.shared.notFound
import com.reposilite.shared.toErrorResponse
import com.reposilite.storage.FilesComparator
import com.reposilite.storage.StorageProvider
import com.reposilite.storage.VersionComparator
import com.reposilite.storage.api.DirectoryInfo
import com.reposilite.storage.api.DocumentInfo
import com.reposilite.storage.api.FileDetails
import com.reposilite.storage.api.FileType.DIRECTORY
import com.reposilite.storage.api.FileType.FILE
import com.reposilite.storage.api.Location
import com.reposilite.storage.api.SimpleDirectoryInfo
import com.reposilite.storage.getExtension
import com.reposilite.storage.getSimpleName
import com.reposilite.storage.inputStream
import com.reposilite.storage.type
import io.javalin.http.ContentType
import io.javalin.http.ContentType.APPLICATION_OCTET_STREAM
import io.javalin.http.HttpStatus.INSUFFICIENT_STORAGE
import panda.std.Result
import panda.std.asSuccess
import java.io.File
import java.io.IOException
import java.io.InputStream
import java.nio.file.Files
import java.nio.file.NoSuchFileException
import java.nio.file.Path
import java.nio.file.StandardCopyOption.REPLACE_EXISTING
import java.nio.file.attribute.FileTime
import kotlin.io.path.absolutePathString
import kotlin.streams.asSequence

/**
 * @param rootDirectory root directory of storage space
 */
abstract class FileSystemStorageProvider protected constructor(
    val journalist: Journalist,
    val rootDirectory: Path
) : StorageProvider {

    override fun shutdown() {}

    override fun putFile(location: Location, inputStream: InputStream): Result<Unit, ErrorResponse> =
        inputStream.use { data ->
            canHold(data.available().toLong())
                .mapErr { INSUFFICIENT_STORAGE.toErrorResponse("Not enough storage space available: ${it.message}") }
                .flatMap { location.resolveWithRootDirectory() }
                .map { file ->
                    if (file.parent != null && !Files.exists(file.parent)) {
                        Files.createDirectories(file.parent)
                    }

                    // TO-FIX: FS locks are not truly respected, there might be a need to enhanced it with .lock file to be sure if it's respected.
                    // In theory people shouldn't redeploy multiple times the same file, but who knows.
                    // Let's try with temporary files.
                    // ~ https://github.com/dzikoysk/reposilite/issues/264

                    val temporaryFile = File.createTempFile("reposilite-", "-fs-put")

                    temporaryFile.outputStream().use { destination ->
                        data.copyTo(destination)
                    }

                    do {
                        try {
                            Files.copy(temporaryFile.toPath(), file, REPLACE_EXISTING)
                        } catch (e: NoSuchFileException) {
                            // Concurrent Files.move calls may throw
                            // ~ https://github.com/dzikoysk/reposilite/issues/1975
                            journalist.logger.debug("[FS][1] Cannot move file ${temporaryFile.absolutePath} to ${file.absolutePathString()}, retrying...")
                            Thread.sleep(1000) // probably good enough for now
                        } catch (e: FileAlreadyExistsException) {
                            // ~ https://github.com/dzikoysk/reposilite/issues/2027
                            journalist.logger.debug("[FS][2] Cannot move file ${temporaryFile.absolutePath} to ${file.absolutePathString()}, retrying...")
                            Thread.sleep(1000) // probably good enough for now
                        }
                    } while (Files.exists(temporaryFile.toPath()))
                }
        }

    override fun getFile(location: Location): Result<InputStream, ErrorResponse> =
        location.resolveWithRootDirectory()
            .exists()
            .flatMap { it.inputStream() }

    override fun getFileDetails(location: Location): Result<out FileDetails, ErrorResponse> =
        location.resolveWithRootDirectory()
            .exists()
            .flatMap { toFileDetails(it) }

    private fun toFileDetails(file: Path): Result<out FileDetails, ErrorResponse> =
        Result.`when`(Files.exists(file), file, notFound("File not found"))
            .flatMap {
                when (it.type()) {
                    FILE -> toDocumentInfo(it)
                    DIRECTORY -> toDirectoryInfo(it)
                }
            }

    private fun toDocumentInfo(file: Path): Result<DocumentInfo, ErrorResponse> =
        DocumentInfo(
            file.getSimpleName(),
            ContentType.getContentTypeByExtension(file.getExtension()) ?: APPLICATION_OCTET_STREAM,
            Files.size(file)
        ).asSuccess()

    private fun toDirectoryInfo(directory: Path): Result<DirectoryInfo, ErrorResponse> =
        DirectoryInfo(
            directory.getSimpleName(),
            Files.list(directory).use { directoryStream ->
                directoryStream.asSequence()
                    .map { toSimpleFileDetails(it).orThrow { error -> IOException(error.message) } }
                    .sortedWith(FilesComparator({ VersionComparator.asVersion(it.name) }, { it.type == DIRECTORY }))
                    .toList()
            }
        ).asSuccess()

    private fun toSimpleFileDetails(file: Path): Result<out FileDetails, ErrorResponse> =
        when (file.type()) {
            FILE -> toDocumentInfo(file)
            DIRECTORY -> SimpleDirectoryInfo(file.getSimpleName()).asSuccess()
        }

    override fun removeFile(location: Location): Result<Unit, ErrorResponse> =
        location.resolveWithRootDirectory().map { rootPath ->
            when {
                Files.isDirectory(rootDirectory) ->
                    Files.walk(rootPath).use { directoryStream ->
                        directoryStream
                            .sorted(Comparator.reverseOrder())
                            .map(Path::toFile)
                            .forEach(File::delete)
                    }
                else -> Files.delete(rootPath)
            }
        }

    override fun getFiles(location: Location): Result<List<Location>, ErrorResponse> =
        location.resolveWithRootDirectory()
            .exists()
            .map {
                Files.walk(it, 1).use { directoryStream ->
                    directoryStream.asSequence()
                        .filter { path -> path != it }
                        .map { path -> Location.of(rootDirectory, path) }
                        .toList()
                }
            }

    override fun getLastModifiedTime(location: Location): Result<FileTime, ErrorResponse> =
        location.resolveWithRootDirectory()
            .exists()
            .map { Files.getLastModifiedTime(it) }

    override fun getFileSize(location: Location): Result<Long, ErrorResponse> =
        location.resolveWithRootDirectory()
            .exists()
            .map {
                when (it.type()) {
                    FILE -> Files.size(it)
                    DIRECTORY -> -1
                }
            }

    override fun exists(location: Location): Boolean =
        location.resolveWithRootDirectory()
            .exists()
            .fold({ true }, { false })

    override fun usage(): Result<Long, ErrorResponse> =
        getFileSize(Location.empty())

    private fun Result<Path, ErrorResponse>.exists(): Result<Path, ErrorResponse> =
        filter({ Files.exists(it) }) { notFound("File not found") }

    private fun Location.resolveWithRootDirectory(): Result<Path, ErrorResponse> =
        toPath()
            .map { rootDirectory.resolve(it) }
            .mapErr { badRequest(it) }

}
