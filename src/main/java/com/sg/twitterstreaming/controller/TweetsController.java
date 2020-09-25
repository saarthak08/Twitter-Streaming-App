package com.sg.twitterstreaming.controller;

import com.sg.twitterstreaming.service.TwitterAPIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tweets/")
public class TweetsController {

    private TwitterAPIService twitterAPIService;

    @Autowired
    public TweetsController(TwitterAPIService twitterAPIService) {
        this.twitterAPIService=twitterAPIService;
    }

    @GetMapping("/{keyword}")
    public Object getTweetsWithKeyword(@PathVariable String keyword) {
        return twitterAPIService.fetchTweetsByKeyword(keyword);
    }
}
