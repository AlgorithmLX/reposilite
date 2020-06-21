/*
 * Copyright (c) 2020 Dzikoysk
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

package org.panda_lang.reposilite.auth;

import org.panda_lang.reposilite.Reposilite;
import org.panda_lang.reposilite.console.ReposiliteCommand;

import java.io.IOException;

public final class RevokeCommand implements ReposiliteCommand {

    private final String alias;

    public RevokeCommand(String alias) {
        this.alias = alias;
    }

    @Override
    public boolean execute(Reposilite reposilite) {
        Token token = reposilite.getTokenService().deleteToken(alias);

        if (token == null) {
            Reposilite.getLogger().info("Alias '" + alias + "' not found");
            return false;
        }

        try {
            reposilite.getTokenService().save();
            Reposilite.getLogger().info("Token for '" + alias + "' has been revoked");
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

}
