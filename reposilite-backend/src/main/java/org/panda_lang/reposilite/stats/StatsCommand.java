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

package org.panda_lang.reposilite.stats;

import org.panda_lang.reposilite.Reposilite;
import org.panda_lang.reposilite.console.ReposiliteCommand;
import org.panda_lang.utilities.commons.StringUtils;
import org.panda_lang.utilities.commons.console.Effect;

import java.util.Map;
import java.util.Map.Entry;

public final class StatsCommand implements ReposiliteCommand {

    private static final int TOP_SIZE = 25;

    private final String pattern;
    private final long limiter;

    public StatsCommand(long limiter, String pattern) {
        this.limiter = limiter;
        this.pattern = pattern;
    }

    public StatsCommand(long limiter) {
        this(limiter, StringUtils.EMPTY);
    }

    public StatsCommand(String pattern) {
        this(0, pattern);
    }

    @Override
    public boolean call(Reposilite reposilite) {
        StatsService statsService = reposilite.getStatsService();

        Reposilite.getLogger().info("");
        Reposilite.getLogger().info("Statistics: ");
        Reposilite.getLogger().info("  Unique requests: " + statsService.countUniqueRecords() + " (count: " + statsService.countRecords() + ")");

        Map<String, Integer> stats = statsService.fetchStats(
                (uri, counts) -> counts >= limiter,
                (uri, counts) -> uri.contains(pattern),
                (uri, counts) -> !uri.endsWith(".md5"),
                (uri, counts) -> !uri.endsWith(".sha1"),
                (uri, counts) -> !uri.endsWith(".pom"),
                (uri, counts) -> !uri.endsWith("/js/app.js")
        );

        Reposilite.getLogger().info("  Recorded: " + (stats.isEmpty() ? "[] " : "") +" (limiter: " + highlight(limiter) + ", pattern: '" + highlight(pattern) + "')");
        int order = 0;

        for (Entry<String, Integer> entry : stats.entrySet()) {
            Reposilite.getLogger().info("    " + (++order) + ". (" + entry.getValue() + ") " + entry.getKey());

            if (limiter == -1 && order == TOP_SIZE) {
                break;
            }
        }

        Reposilite.getLogger().info("");
        return true;
    }

    private String highlight(Object value) {
        return Effect.BLACK_BOLD + value.toString() + Effect.RESET;
    }

}
