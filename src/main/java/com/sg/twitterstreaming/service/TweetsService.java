package com.sg.twitterstreaming.service;


import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public interface TweetsService {

    Object recentSearchTweetsByKeyword(String keyword,String nextToken);

    Flux<String> startTweetsStreaming();

}
