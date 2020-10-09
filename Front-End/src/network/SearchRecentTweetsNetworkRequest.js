import axios from "axios";

const apiUrl = `http://localhost:8080/api/tweets/search`;

export const searchRecentTweets = async ({
    query = "",
    startTime = "",
    nextToken = "",
} = {}) => {
    var params = {
        keyword: query,
    };
    if (startTime.length !== 0) {
        params["start_time"] = startTime;
    }
    if (nextToken.length !== 0) {
        params["next_token"] = nextToken;
    }
    console.log(params);
    return await axios
        .get(apiUrl, { params: params })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((e) => {
            console.log(e);
            throw e;
        });
};
