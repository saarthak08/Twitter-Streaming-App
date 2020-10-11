package com.sg.twitterstreaming.unit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sg.twitterstreaming.controller.TweetAPIController;
import com.sg.twitterstreaming.model.DataResponse;
import com.sg.twitterstreaming.model.service.tweet.Data;
import com.sg.twitterstreaming.model.service.tweet.FluxResponse;
import com.sg.twitterstreaming.model.service.tweet.Tweet;
import com.sg.twitterstreaming.service.TweetAPIService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@WebFluxTest(TweetAPIController.class)
public class TweetAPIControllerFluxUnitTest {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TweetAPIService tweetAPIService;

    @Test
    public void startSampleTweetsStreamingTest() throws Exception {
        DataResponse dataResponse = new DataResponse();
        List<DataResponse> json = new ArrayList<>();
        json.add(dataResponse);
        Flux<DataResponse> dataFlux = Flux.fromIterable(json);
        when(tweetAPIService.startRealtimeTweetsStreaming()).thenReturn(dataFlux);
        webTestClient.get().uri("/api/tweets/sample-stream")
                .exchange().expectStatus().isOk()
                .expectBodyList(String.class);
    }

    @Test
    public void startLiveTweetsStreamingTest() throws Exception {
        DataResponse dataResponse = new DataResponse();
        List<DataResponse> json = new ArrayList<>();
        json.add(dataResponse);
        Flux<DataResponse> dataFlux = Flux.fromIterable(json);
        when(tweetAPIService.startRealtimeTweetsStreaming()).thenReturn(dataFlux);
        webTestClient.get().uri("/api/tweets/live-stream")
                .exchange().expectStatus().isOk()
                .expectBodyList(String.class);
    }

}
