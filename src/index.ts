require('dotenv').config();
import ChatInput from './classes/chatInput';
import EmulateInput from './classes/emulateInput';

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
