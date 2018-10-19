"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var chatInput_1 = require("./classes/chatInput");
new chatInput_1.default({
    identity: {
        username: 'LetsPlayGamesTogether',
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        'onbijtkoek'
    ]
});
