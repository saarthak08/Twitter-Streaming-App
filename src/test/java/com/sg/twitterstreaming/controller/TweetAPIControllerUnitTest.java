package com.sg.twitterstreaming.controller;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sg.twitterstreaming.model.tweet.Data;
import com.sg.twitterstreaming.model.tweet.Tweet;
import com.sg.twitterstreaming.service.TweetAPIService;
import org.junit.jupiter.api.Test;

import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;

// Unit Test for Tweet API Controller
@WebMvcTest(TweetAPIController.class)
public class TweetAPIControllerUnitTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TweetAPIService tweetAPIService;

    @Autowired
    private ObjectMapper objectMapper;


    @Test
    public void recentSearchTest() throws Exception {
        Data data=new Data();
        List<Tweet> tweetList=new ArrayList<>();
        tweetList.add(new Tweet((long)1,"test tweet"));
        data.setTweetList(tweetList);
        ResponseEntity<?> responseEntity=new ResponseEntity<>(data, HttpStatus.OK);
        when(tweetAPIService.recentSearchTweetsByKeyword(anyString(),anyString()))
        .thenReturn(responseEntity);
        String expectedResponse = objectMapper.writeValueAsString(data);
        MvcResult mvcResult=this.mockMvc.perform(get("/api/tweets/search")
        .param("keyword","test")
        .param("next_token",""))
                .andReturn();
        String jsonResponse=mvcResult.getResponse().getContentAsString();
        assertThat(jsonResponse).isEqualTo(expectedResponse);
    }

}