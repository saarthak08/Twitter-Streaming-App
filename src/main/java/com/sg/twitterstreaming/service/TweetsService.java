package com.sg.twitterstreaming.service;


import org.springframework.http.ResponseEntity;

public interface TweetsService {

    public ResponseEntity<?> fetchTweetsByKeyword(String keyword);

    public ResponseEntity<?> fetchTweetsByUsername(String username);

    public ResponseEntity<?> fetchTweetsByKeywordAndUsername(String keyword, String username);

}
