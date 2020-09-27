package com.sg.twitterstreaming.service;

import com.sg.twitterstreaming.config.Key;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.Disposable;
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.time.Duration;

@Service
public class APIService implements TweetsService {

    private final RestTemplate restTemplate;

    private final WebClient webClient = WebClient.create();

    private final String token = Key.BearerToken;

    private final String baseURL = "https://api.twitter.com/2/tweets/search/recent?max_results=20&tweet.fields=public_metrics&";

    public APIService() {
        restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add(new ClientHttpRequestInterceptor() {
            @Override
            public ClientHttpResponse intercept(HttpRequest httpRequest, byte[] bytes, ClientHttpRequestExecution clientHttpRequestExecution) throws IOException {
                httpRequest.getHeaders().add("Authorization", "Bearer " + token);
                return clientHttpRequestExecution.execute(httpRequest, bytes);
            }
        });
    }


    @Override
    public Object fetchTweetsByKeyword(String keyword) {
        return restTemplate.getForObject(baseURL + "query={keyword}", Object.class, keyword);
    }

    @Override
    public ResponseEntity<?> fetchTweetsByUsername(String username) {
        return null;
    }

    @Override
    public ResponseEntity<?> fetchTweetsByKeywordAndUsername(String keyword, String username) {
        return null;
    }

    @Override
    public Flux<String> startTweetsStreaming() {
        return webClient.get()
                .uri("https://api.twitter.com/2/tweets/sample/stream")
                .header("Authorization", "Bearer " + Key.BearerToken)
                .retrieve()
                .bodyToFlux(String.class)
                .delayElements(Duration.ofSeconds(1))
                .take(Duration.ofMinutes(1));
    }
}
