const defaultTweetsState = [
    {
        createdAt: "2020-10-07T19:36:03.000Z",
        id: 1313926077689938000,
        media: [
            {
                media_key: "3_1312022739511730177",
                preview_image_url: null,
                type: "photo",
                url: "https://pbs.twimg.com/media/EjU9uu3U4AEV_zO.jpg",
            },
            {
                media_key: "3_1314279863004606464",
                preview_image_url: null,
                type: "photo",
                url: "https://pbs.twimg.com/media/Ej1CknHWsAAajTo.jpg",
            },
        ],
        publicMetrics: {
            like_count: 41846,
            quote_count: 89,
            reply_count: 1045,
            retweet_count: 4218,
        },
        text: "Absolutely. https://t.co/2U0NUlElSQ",
        user: {
            id: 101311381,
            name: "Shah Rukh Khan",
            username: "iamsrk",
        },
    },
];

export default (state = defaultTweetsState, action) => {
    switch (action.type) {
        case "ADD_TWEETS": {
            return [...state, ...action.tweets];
        }
        case "CLEAR_TWEETS": {
            return [];
        }
        default:
            return state;
    }
};
