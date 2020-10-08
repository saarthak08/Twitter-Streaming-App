package com.sg.twitterstreaming.model.service.tweet;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
@Data
public class User implements Serializable {

    @Id
    private Long id;

    private String name;

    private String username;
}
