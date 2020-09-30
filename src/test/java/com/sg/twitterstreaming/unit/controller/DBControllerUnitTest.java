package com.sg.twitterstreaming.unit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sg.twitterstreaming.controller.TweetAPIController;
import com.sg.twitterstreaming.controller.TweetDBController;
import com.sg.twitterstreaming.model.streamrule.StreamRule;
import com.sg.twitterstreaming.model.tweet.Data;
import com.sg.twitterstreaming.model.tweet.Tweet;
import com.sg.twitterstreaming.repository.TweetRepository;
import com.sg.twitterstreaming.service.TweetAPIService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(TweetDBController.class)
public class DBControllerUnitTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TweetRepository tweetRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void getAllOfflineTweetsTest() throws Exception {
        Data data=new Data();
        List<Tweet> tweetList=new ArrayList<>();
        tweetList.add(new Tweet((long)1,"test tweet"));
        data.setTweetList(tweetList);
        String json=objectMapper.writeValueAsString(data);
        when(tweetRepository.findAll()).thenReturn(tweetList);
        MvcResult mvcResult=mockMvc.perform(get("/api/tweets/offline/get-all"))
                .andReturn();
        String expectedResponse=mvcResult.getResponse().getContentAsString();
        assertThat(json).isEqualTo(expectedResponse);
    }


    @Test
    public void addTweetToDBTest() throws Exception {
        Tweet test=new Tweet((long)1,"test tweet");
        ResponseEntity<?> responseEntity= new ResponseEntity<>("Success", HttpStatus.OK);
        when(tweetRepository.save(test)).thenReturn(test);
        MvcResult mvcResult=mockMvc.perform(post("/api/tweets/offline/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(test)))
                .andReturn();
        String expectedResponse=mvcResult.getResponse().getContentAsString();
        assertThat(responseEntity.getBody()).isEqualTo(expectedResponse);
    }


    @Test
    public void deleteTweetFromDBTest() throws Exception {
        ResponseEntity<?> responseEntity= new ResponseEntity<>("Success", HttpStatus.OK);
        MvcResult mvcResult=mockMvc.perform(delete("/api/tweets/offline/delete/{id}","1")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        String expectedResponse=mvcResult.getResponse().getContentAsString();
        assertThat(responseEntity.getBody()).isEqualTo(expectedResponse);
    }

}