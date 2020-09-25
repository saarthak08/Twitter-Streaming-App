package com.sg.twitterstreaming.service;


import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface TweetsService {

    public Object fetchTweetsByKeyword(String keyword);

    public ResponseEntity<?> fetchTweetsByUsername(String username);

    public ResponseEntity<?> fetchTweetsByKeywordAndUsername(String keyword, String username);

}
