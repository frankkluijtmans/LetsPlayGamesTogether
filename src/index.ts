require('dotenv').config();
import EmulateInput from './classes/emulateInput';
import ChatInput from './classes/chatInput';

const emulateInput = new EmulateInput('snes');

setInterval(() => {

	emulateInput.emulateKeypress('up');
}, 1000);

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
