package com.sg.twitterstreaming.controller;

import com.sg.twitterstreaming.model.DataResponse;
import com.sg.twitterstreaming.model.TweetResponse;
import com.sg.twitterstreaming.model.service.tweet.Data;
import com.sg.twitterstreaming.model.service.tweet.Tweet;
import com.sg.twitterstreaming.repository.TweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tweets/offline")
public class TweetDBController {

    private final TweetRepository tweetRepository;

    @Autowired
    public TweetDBController(TweetRepository tweetRepository) {
        this.tweetRepository = tweetRepository;
    }

    @GetMapping("/get-all")
    public DataResponse getAllOfflineTweets() {
        DataResponse data = new DataResponse();
        data.setTweetResponse(tweetRepository.findAll());
        return data;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTweetToDB(@RequestBody TweetResponse tweet) {
        try {
            tweetRepository.save(tweet);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error in adding tweet.", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTweetFromDB(@PathVariable Long id) {
        try {
            tweetRepository.deleteById(id);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error in deleting tweet.", HttpStatus.BAD_REQUEST);
        }
    }
}
