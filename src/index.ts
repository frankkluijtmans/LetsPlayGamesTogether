require('dotenv').config();
import ChatInput from './classes/chatInput';

new ChatInput(
    {
        identity: {
            username: 'LetsPlayGamesTogether',
            password: process.env.OAUTH_TOKEN
        },
        channels: [
            'onbijtkoek'
        ]
    }
);