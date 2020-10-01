package com.sg.twitterstreaming.integration.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TweetAPIControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void recentSearchTweetsTest() throws Exception {
        this.mockMvc.perform(get("/api/tweets/search")
                .param("keyword","test"))
                .andExpect(status().is2xxSuccessful()).andReturn();
    }

    @Test
    public void getRealtimeStreamRulesTest() throws Exception {
        this.mockMvc.perform(get("/api/tweets/live-stream/rules"))
                .andExpect(status().is2xxSuccessful()).andReturn();
    }

}
