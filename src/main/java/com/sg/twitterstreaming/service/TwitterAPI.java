package com.sg.twitterstreaming.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
public class TwitterAPI implements TweetsService {

    private RestTemplate restTemplate;

    @Value("${TWITTER_BEARER_TOKEN}")
    private String token;

    private final String baseURL = "https://api.twitter.com/2/tweets/search/recent?query=saarthak&max_results=20&tweet.fields=public_metrics";

    public TwitterAPI() {
        restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add(new ClientHttpRequestInterceptor() {
            @Override
            public ClientHttpResponse intercept(HttpRequest httpRequest, byte[] bytes, ClientHttpRequestExecution clientHttpRequestExecution) throws IOException {
                httpRequest.getHeaders().add("Authorization","Bearer "+token);
                return clientHttpRequestExecution.execute(httpRequest,bytes);
            }
        });
    }


    @Override
    public ResponseEntity<?> fetchTweetsByKeyword(String keyword) {
        return null;
    }

    @Override
    public ResponseEntity<?> fetchTweetsByUsername(String username) {
        return null;
    }

    @Override
    public ResponseEntity<?> fetchTweetsByKeywordAndUsername(String keyword, String username) {
        return null;
    }
}
