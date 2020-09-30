package com.sg.twitterstreaming.controller.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sg.twitterstreaming.controller.TweetAPIController;
import com.sg.twitterstreaming.model.tweet.Data;
import com.sg.twitterstreaming.model.tweet.Tweet;
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
        Data data=new Data();
        List<Tweet> tweetList=new ArrayList<>();
        tweetList.add(new Tweet((long)1,"test tweet"));
        data.setTweetList(tweetList);
        String dataString = objectMapper.writeValueAsString(data);
        List<String> json=new ArrayList<>();
        json.add(dataString);
        Flux<String> dataFlux=Flux.fromIterable(json);
        when(tweetAPIService.startRealtimeTweetsStreaming()).thenReturn(dataFlux);
        webTestClient.get().uri("/api/tweets/sample-stream")
                .exchange().expectStatus().isOk()
                .expectBodyList(String.class);
    }

    @Test
    public void startLiveTweetsStreamingTest() throws Exception {
        Data data=new Data();
        List<Tweet> tweetList=new ArrayList<>();
        tweetList.add(new Tweet((long)1,"test tweet"));
        data.setTweetList(tweetList);
        String dataString = objectMapper.writeValueAsString(data);
        List<String> json=new ArrayList<>();
        json.add(dataString);
        Flux<String> dataFlux=Flux.fromIterable(json);
        when(tweetAPIService.startRealtimeTweetsStreaming()).thenReturn(dataFlux);
        webTestClient.get().uri("/api/tweets/live-stream")
                .exchange().expectStatus().isOk()
                .expectBodyList(String.class);
    }

}
