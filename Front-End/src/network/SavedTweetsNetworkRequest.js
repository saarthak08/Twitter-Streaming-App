import axios from "axios";

var baseURL = "http://localhost:8080/api/tweets/saved";

export const addTweetToSavedTweets = async (tweet) => {
    const url = baseURL + "/add";
    return await axios
        .post(url, tweet)
        .then((res) => res)
        .catch((e) => {
            console.log(e);
            throw e;
        });
};
