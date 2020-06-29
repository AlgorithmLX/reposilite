package org.panda_lang.reposilite.repository;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.auth.AuthenticationException;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.HttpClients;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.panda_lang.reposilite.ReposiliteIntegrationTest;
import org.panda_lang.utilities.commons.IOUtils;
import org.panda_lang.utilities.commons.StringUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DeployControllerTest extends ReposiliteIntegrationTest {

    private final HttpClient client = HttpClients.createDefault();

    @BeforeEach
    void configure() {
        super.reposilite.getTokenService().createToken("/releases/auth/test", "authtest", "secure");
    }

    @Test
    void shouldReturn401AndArtifactDeploymentIsDisabledMessage() throws IOException, AuthenticationException {
        super.reposilite.getConfiguration().setDeployEnabled(false);
        shouldReturn401AndGivenMessage("/releases/groupId/artifactId/file", "authtest", "secure", "content", "Artifact deployment is disabled");
    }

    @Test
    void shouldReturn401AndInvalidCredentialsMessage() throws IOException, AuthenticationException {
        shouldReturn401AndGivenMessage("/releases/groupId/artifactId/file", "authtest", "invalid_token", "content", "Invalid authorization credentials");
    }

    private void shouldReturn401AndGivenMessage(String uri, String username, String password, String content, String message) throws IOException, AuthenticationException {
        HttpResponse response = put(uri, username, password, content);
        assertEquals(HttpStatus.SC_UNAUTHORIZED, response.getStatusLine().getStatusCode());

        String result = IOUtils.toString(response.getEntity().getContent(), StandardCharsets.UTF_8);
        assertNotNull(result);
        assertTrue(result.contains(message));
    }

    @Test
    void shouldReturn200AndSuccessMessageForMetadataFiles() throws IOException, AuthenticationException {
        shouldReturn200AndSuccessMessage("/releases/auth/test/maven-metadata.xml", "authtest", "secure", StringUtils.EMPTY);
    }

    @Test
    void shouldReturn200AndSuccessMessage() throws IOException, AuthenticationException {
        shouldReturn200AndSuccessMessage("/releases/auth/test/pom.xml", "authtest", "secure", "maven metadata content");
    }

    private void shouldReturn200AndSuccessMessage(String uri, String username, String password, String content) throws IOException, AuthenticationException {
        HttpResponse deployResponse = put(uri, username, password, content);
        assertEquals(HttpStatus.SC_OK, deployResponse.getStatusLine().getStatusCode());

        String result = IOUtils.toString(deployResponse.getEntity().getContent(), StandardCharsets.UTF_8);
        assertNotNull(result);
        assertEquals("Success", result);

        if (StringUtils.isEmpty(content)) {
            return;
        }

        assertEquals(HttpStatus.SC_OK, super.getAuthenticated(uri, username, password).getStatusCode());
        assertEquals(content, super.getAuthenticated(uri, username, password).parseAsString());
    }

    private HttpResponse put(String uri, String username, String password, String content) throws IOException, AuthenticationException {
        HttpPut httpPut = new HttpPut(url(uri).toString());
        httpPut.setEntity(new StringEntity(content));
        httpPut.addHeader(new BasicScheme().authenticate(new UsernamePasswordCredentials(username, password), httpPut, null));
        return client.execute(httpPut);
    }

}