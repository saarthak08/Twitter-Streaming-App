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

export const getAllSavedTweets = async () => {
    const url = baseURL + "/get-all";
    return await axios
        .get(url)
        .then((res) => res)
        .catch((e) => {
            console.log(e);
            throw e;
        });
};

export const deleteSavedTweet = async (id) => {
    const url = baseURL + `/delete/${id}`;
    return await axios
        .delete(url)
        .then((res) => res)
        .catch((e) => {
            console.log(e);
            throw e;
        });
};
