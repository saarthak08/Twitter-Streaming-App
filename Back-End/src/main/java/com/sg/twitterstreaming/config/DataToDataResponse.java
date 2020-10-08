package com.sg.twitterstreaming.config;

import com.sg.twitterstreaming.model.DataResponse;
import com.sg.twitterstreaming.model.TweetResponse;
import com.sg.twitterstreaming.model.service.tweet.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@lombok.Data
public class DataToDataResponse {

    private Data data;
    private DataResponse dataResponse;
    private Map<Long, User> userMap;
    private Map<String, List<Media>> mediaMap;

    public DataToDataResponse(Data data) {
        this.data = data;
        this.dataResponse = new DataResponse();
        userMap = new HashMap<>();
        mediaMap = new HashMap<>();
        dataResponse.setMeta(data.getMeta());
        List<TweetResponse> tweetResponseList = new ArrayList<>();
        dataResponse.setTweetResponse(tweetResponseList);
        setHashMaps();
        setCommonProperties();
    }

    private void setHashMaps() {
        Includes includes = data.getIncludes();
        if (includes != null) {
            if (includes.getMedia() != null) {
                for (Media m : includes.getMedia()) {
                    if (!mediaMap.containsKey(m.getMediaKey())) {
                        mediaMap.put(m.getMediaKey(), new ArrayList<Media>());
                    }
                    if (m.getPreviewImageURL() != null) {
                        m.setUrl(m.getPreviewImageURL());
                    }
                    mediaMap.get(m.getMediaKey()).add(m);
                }
            }
            if (includes.getUsers() != null) {
                for (User u : includes.getUsers()) {
                    userMap.put(u.getId(), u);
                }
            }
        }
    }

    private void setCommonProperties() {
        List<Tweet> tweetList = data.getTweetList();
        if (tweetList != null) {
            for (Tweet t : tweetList) {
                TweetResponse x = new TweetResponse();
                x.setText(t.getText());
                x.setCreatedAt(t.getCreatedAt());
                x.setId(t.getId());
                x.setPublicMetrics(t.getPublicMetrics());
                setUser(x, t);
                setMedia(x, t);
                dataResponse.getTweetResponse().add(x);
            }
        }
    }

    private void setMedia(TweetResponse tweetResponse, Tweet tweet) {
        if (tweet.getAttachments() != null) {
            tweetResponse.setMedia(new ArrayList<>());
            if (tweet.getAttachments().getMediaArray() != null) {
                for (String a : tweet.getAttachments().getMediaArray()) {
                    if (mediaMap.containsKey(a)) {
                        for (Media m : mediaMap.get(a)) {
                            tweetResponse.getMedia().add(m);
                        }
                    }
                }
            }
        }
    }

    private void setUser(TweetResponse tweetResponse, Tweet tweet) {
        if (userMap.containsKey(tweet.getAuthorId())) {
            tweetResponse.setUser(userMap.get(tweet.getAuthorId()));
        }
    }
}
