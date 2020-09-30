package com.sg.twitterstreaming.model.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
public class Tweet implements Serializable {

    @Column(unique = true)
    @JsonProperty("id")
    @Id
    private Long id;

    private String text;

    public Tweet() {

    }
}
