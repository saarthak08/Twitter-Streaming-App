package com.sg.twitterstreaming.repository;

import com.sg.twitterstreaming.model.TweetResponse;
import com.sg.twitterstreaming.model.service.tweet.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TweetRepository extends JpaRepository<TweetResponse, String> {
}
