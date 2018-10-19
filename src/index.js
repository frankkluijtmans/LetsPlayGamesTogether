"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var emulateInput_1 = require("./classes/emulateInput");
var chatInput_1 = require("./classes/chatInput");
var emulateInput = new emulateInput_1.default('snes');
setInterval(function () {
    emulateInput.emulateKeypress('up');
}, 1000);
new chatInput_1.default({
    identity: {
        username: 'LetsPlayGamesTogether',
        password: process.env.OAUTH_TOKEN
    },
    channels: [
        'onbijtkoek'
    ]
});
