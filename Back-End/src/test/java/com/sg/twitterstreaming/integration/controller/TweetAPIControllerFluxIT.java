package com.sg.twitterstreaming.integration.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
public class TweetAPIControllerFluxIT {

    @Autowired
    private WebTestClient webTestClient;


    @Test
    public void startSampleTweetStreamingTest() throws Exception {
        this.webTestClient.get().uri("/api/tweets/sample-stream")
                .exchange().expectStatus().isOk();
    }

    /*
              *** FAILS IF RULES ARE SET UNIQUE ***
    @Test
    public void startRealtimeTweetStreamingTest() throws Exception {
        this.webTestClient.get().uri("/api/tweets/live-stream")
                .exchange().expectStatus().isOk();
    }
     */
}
