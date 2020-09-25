package com.sg.twitterstreaming.service;

import com.sg.twitterstreaming.config.Key;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class TwitterAPIService implements TweetsService {

    private final RestTemplate restTemplate;

    private final String token= Key.BearerToken;

    private final String baseURL = "https://api.twitter.com/2/tweets/search/recent?max_results=20&tweet.fields=public_metrics&";

    public TwitterAPIService() {
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
    public Object fetchTweetsByKeyword(String keyword) {
        return restTemplate.getForObject(baseURL+"query={keyword}",Object.class,keyword);
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
