package com.sg.twitterstreaming.service;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import com.sg.twitterstreaming.config.DataToDataResponse;
import com.sg.twitterstreaming.config.FluxStringToDataResponse;
import com.sg.twitterstreaming.config.Key;
import com.sg.twitterstreaming.model.DataResponse;
import com.sg.twitterstreaming.model.service.tweet.Data;
import com.sg.twitterstreaming.model.service.tweet.FluxResponse;
import com.sg.twitterstreaming.model.service.tweet.Includes;
import com.sg.twitterstreaming.model.service.tweet.Tweet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Map;

@Service
public class TweetAPIService {

    private final RestTemplate restTemplate;

    private final WebClient webClient;

    private final String token = Key.BearerToken;

    private final String baseSearchURL = "https://api.twitter.com/2/tweets/search/recent?max_results=20&tweet.fields=created_at,public_metrics,attachments,author_id&expansions=attachments.media_keys,author_id&media.fields=url,preview_image_url&";
    private final String baseRuleURL = "https://api.twitter.com/2/tweets/search/stream/rules";

    @Autowired
    public TweetAPIService() {
        webClient = WebClient.create();
        restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add(new ClientHttpRequestInterceptor() {
            @Override
            public ClientHttpResponse intercept(HttpRequest httpRequest, byte[] bytes, ClientHttpRequestExecution clientHttpRequestExecution) throws IOException, IOException {
                httpRequest.getHeaders().add("Authorization", "Bearer " + token);
                return clientHttpRequestExecution.execute(httpRequest, bytes);
            }
        });
    }

    public ResponseEntity<?> recentSearchTweetsByKeyword(String keyword, String nextToken, String startTime) {
        if (nextToken == null) {
            if (startTime != null) {
                return restTemplate.getForEntity(baseSearchURL + "query={keyword}&start_time={startTime}", Data.class, keyword, startTime);
            } else {
                return restTemplate.getForEntity(baseSearchURL + "query={keyword}", Data.class, keyword);
            }
        } else {
            if (startTime != null) {
                return restTemplate.getForEntity(baseSearchURL + "query={keyword}&start_time={startTime}&next_token={nextToken}", Data.class, keyword, startTime, nextToken);
            } else {
                return restTemplate.getForEntity(baseSearchURL + "query={keyword}&next_token={nextToken}", Data.class, keyword, nextToken);
            }
        }
    }

    public Flux<DataResponse> startSampleTweetsStreaming() {
        return webClient.get()
                .uri("https://api.twitter.com/2/tweets/sample/stream?tweet.fields=created_at,public_metrics,attachments,author_id&expansions=attachments.media_keys,author_id&media.fields=url,preview_image_url")
                .header("Authorization", "Bearer " + Key.BearerToken)
                .retrieve()
                .bodyToFlux(String.class)
                .map(s -> {
                    FluxStringToDataResponse fluxStringToDataResponse = new FluxStringToDataResponse(s);
                    return fluxStringToDataResponse.getDataResponse();
                })
                .delaySubscription(Duration.ofMillis(500))
                .delayElements(Duration.ofSeconds(1))
                .take(Duration.ofMinutes(1));
    }


    public Flux<DataResponse> startRealtimeTweetsStreaming() {
        return webClient.get()
                .uri("https://api.twitter.com/2/tweets/search/stream?tweet.fields=created_at,public_metrics,attachments,author_id&expansions=attachments.media_keys,author_id&media.fields=url,preview_image_url")
                .header("Authorization", "Bearer " + Key.BearerToken)
                .retrieve()
                .bodyToFlux(String.class)
                .map(s -> {
                    FluxStringToDataResponse fluxStringToDataResponse = new FluxStringToDataResponse(s);
                    return fluxStringToDataResponse.getDataResponse();
                })
                .delaySubscription(Duration.ofMillis(500))
                .delayElements(Duration.ofSeconds(1))
                .take(Duration.ofMinutes(1));
    }

    public ResponseEntity<?> getRealtimeStreamRules() {
        return restTemplate.getForEntity(baseRuleURL, com.sg.twitterstreaming.model.service.streamrule.Data.class);
    }

    public ResponseEntity<Object> postRealtimeStreamRules(Map<String, Object> requestObject) {
        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<Map<String, Object>>(requestObject);
        return restTemplate.postForEntity(baseRuleURL, httpEntity, Object.class);
    }
}
