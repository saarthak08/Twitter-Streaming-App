package com.sg.twitterstreaming.model.service.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
@Data
public class Media implements Serializable {

    @Id
    @JsonProperty("media_key")
    private String mediaKey;

    private String type;

    @JsonProperty("preview_image_url")
    private String previewImageURL;

    @JsonProperty("url")
    private String url;
}
