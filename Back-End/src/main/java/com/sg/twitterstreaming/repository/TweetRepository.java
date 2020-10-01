package com.sg.twitterstreaming.repository;

import com.sg.twitterstreaming.model.tweet.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {
}
