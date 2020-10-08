package com.sg.twitterstreaming.unit.controller;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sg.twitterstreaming.controller.TweetAPIController;
import com.sg.twitterstreaming.model.service.streamrule.StreamRule;
import com.sg.twitterstreaming.model.service.tweet.Data;
import com.sg.twitterstreaming.model.service.tweet.Tweet;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Unit Test for Tweet API Controller REST APIs
@WebMvcTest(TweetAPIController.class)
public class TweetAPIControllerUnitTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TweetAPIService tweetAPIService;

    @Autowired
    private ObjectMapper objectMapper;


    @Test
    public void recentSearchTweetsTest() throws Exception {
        Data data=new Data();
        List<Tweet> tweetList=new ArrayList<>();
        tweetList.add(new Tweet());
        data.setTweetList(tweetList);
        ResponseEntity<?> responseEntity=new ResponseEntity<>(data, HttpStatus.OK);
        Mockito.<ResponseEntity<?>>when(tweetAPIService.recentSearchTweetsByKeyword(anyString(),anyString(),anyString()))
                .thenReturn(responseEntity);
        String expectedResponse = objectMapper.writeValueAsString(data);
        MvcResult mvcResult=this.mockMvc.perform(get("/api/tweets/search")
        .param("keyword","test")
        .param("next_token","")
                .param("start_date",""))
                .andReturn();
        String jsonResponse=mvcResult.getResponse().getContentAsString();
        assertThat(jsonResponse).isEqualTo(expectedResponse);
    }

    @Test
    public void getRealtimeStreamRulesTest() throws Exception {
        com.sg.twitterstreaming.model.service.streamrule.Data data=new com.sg.twitterstreaming.model.service.streamrule.Data();
        List<StreamRule> ruleList = new ArrayList<>();
        ruleList.add(new StreamRule("1","test-rule"));
        data.setRuleList(ruleList);
        ResponseEntity<?> responseEntity = new ResponseEntity<>(data,HttpStatus.OK);
        Mockito.<ResponseEntity<?>>when(tweetAPIService.getRealtimeStreamRules()).thenReturn(responseEntity);
        String expectedResponse = objectMapper.writeValueAsString(data);
        MvcResult mvcResult=this.mockMvc.perform(get("/api/tweets/live-stream/rules"))
                .andReturn();
        String jsonResponse = mvcResult.getResponse().getContentAsString();
        assertThat(jsonResponse).isEqualTo(expectedResponse);
    }

    @Test
    public void setRealtimeStreamRulesTest() throws Exception {
        com.sg.twitterstreaming.model.service.streamrule.Data data=new com.sg.twitterstreaming.model.service.streamrule.Data();
        List<StreamRule> ruleList = new ArrayList<>();
        ruleList.add(new StreamRule("1","test-rule"));
        data.setRuleList(ruleList);
        Map<String,Object> requestObject = new HashMap<>();
        requestObject.put("data",data);
        ResponseEntity<Object> responseEntity=new ResponseEntity<Object>(Object.class,HttpStatus.OK);
        Mockito.<ResponseEntity<?>>when(tweetAPIService.postRealtimeStreamRules(any())).thenReturn(responseEntity);
        String expectedResponse = objectMapper.writeValueAsString(responseEntity.getBody());
        MvcResult mvcResult=this.mockMvc.perform(post("/api/tweets/live-stream/rules")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(requestObject))).andReturn();
        String jsonResponse = mvcResult.getResponse().getContentAsString();
        assertThat(jsonResponse).isEqualTo(expectedResponse);
    }

}