package com.sg.twitterstreaming.controller.api.integration_test;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
public class FluxIntegrationTest {

    @Autowired
    private WebTestClient webTestClient;


    @Test
    public void startSampleTweetStreamingTest() throws Exception {
        this.webTestClient.get().uri("/api/tweets/sample-stream")
                .exchange().expectStatus().isOk();
    }

    @Test
    public void startTweetStreamingTest() throws Exception {
        this.webTestClient.get().uri("/api/tweets/sample-stream")
                .exchange().expectStatus().isOk();
    }
}
