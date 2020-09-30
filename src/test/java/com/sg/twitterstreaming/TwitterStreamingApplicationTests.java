package com.sg.twitterstreaming;

import com.sg.twitterstreaming.controller.TweetAPIController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class TwitterStreamingApplicationTests {

    /*
    Unit tests are used for testing modules independently. All the other dependencies are mocked. Spring Context is not used in unit tests.
    Integration tests are used with the spring context & all dependencies are tested together without mocking them.
     */

    //Sample test to ensure that Context loads correctly & DI is working correctly.
    @Autowired
    private TweetAPIController tweetAPIController;


    @Test
    void contextLoads() throws Exception {
        assertThat(tweetAPIController).isNotNull();
    }

}
