import axios from "axios";

const url = "https://twitter-streaming-app-backend.herokuapp.com/api/tweets/live-stream/rules";

export const getAllStreamRules = async () => {
    return await axios
        .get(url)
        .then((res) => res)
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

export const addStreamRule = async (rule) => {
    var reqBody = {
        add: [rule],
    };
    return await axios
        .post(url, reqBody)
        .then((res) => res)
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

export const deleteStreamRule = async (id) => {
    var reqBody = {
        delete: {
            ids: [id],
        },
    };

    return await axios
        .post(url, reqBody)
        .then((res) => res)
        .catch((err) => {
            console.log(err);
            throw err;
        });
};
