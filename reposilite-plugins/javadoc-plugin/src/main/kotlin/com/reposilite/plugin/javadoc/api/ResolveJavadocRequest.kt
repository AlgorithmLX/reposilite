package com.reposilite.plugin.javadoc.api

import com.reposilite.storage.api.Location
import com.reposilite.token.api.AccessTokenDto

data class ResolveJavadocRequest(
    val repository: String,
    val gav: Location,
    val accessToken: AccessTokenDto?
)