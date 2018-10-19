const tmi = require('tmi.js');
import BotOptions from '../interfaces/bot_options';
import Input from '../configuration/input';
import EmulateInput from '../classes/emulateInput';
const emulateInput = new EmulateInput('snes');

export default class ChatInput {

    private commandPrefix: string;
    private opts: BotOptions;
    private client: any;
    private knownCommands: string[];

    /**
     * Represents the ChatInput handler
     * @constructor
     */
    constructor(opts: BotOptions) {

        this.commandPrefix = '!';
        this.opts = opts;
        this.client = new tmi.client(this.opts);
        this.knownCommands = Object.keys(Input.snes);

        // Connect to Twitch
        this.client.connect();

        this.registerHandlers();
    }

    /**
     * Registers all the necessary handlers we get from the TMI client
     * 
     * @return{void}
     */
    registerHandlers() {

        this.client.on('message', this.onMessageHandler.bind(this))
        this.client.on('connected', this.onConnectedHandler)
        this.client.on('disconnected', this.onDisconnectedHandler)
    }

    /**
     * Performs the necessary checks of a chatmessage so it might be processed as input
     * 
     * @param {string} target - The target channel
     * @param {Object} context - The message context
     * @param {string} message - The message body
     * @param {boolean} self - True if the message came from the chatbot itself
     * 
     * @return {void}
     */
    onMessageHandler(target: any, context: any, message: string, self: boolean) {

        // Don't listen to the Chatbot's own messages
        if (self) {

            return;
        }

        if (message.substr(0, 1) === this.commandPrefix) {

            let parsedMessage = message.substr(1);

            if (this.knownCommands.indexOf(parsedMessage) > -1) {

                //input is valid, so emulate keypress
                this.emulateKeyPress(parsedMessage);
            }
        }
    }

    /**
     * Handles the connected event
     * 
     * @param {string} address - The IRC host address
     * @param {number | string} port - Port number 
     * 
     * @return {void}
     */
    onConnectedHandler(address: string, port: number | string) {

        console.log(`* Connected to ${address}:${port}`);
    }

    /**
     * Handles the disconnected event
     * 
     * @param {string} reason - The reason why the bot was disconnected 
     * 
     * @return {void}
     */
    onDisconnectedHandler(reason: string) {

        console.log(`Disconnected: ${reason}`);
    }

    /**
     * Sends a message to the target channel
     * 
     * @param {string} target - The target channel
     * @param {Object} context - The message context
     * @param {string} message - The message body
     * 
     * @return {void}
     */
    sendMessage(target: any, context: any, message: string) {

        if (context['message-type'] === 'whisper') {

            this.client.whisper(target, message)
        } else {

            this.client.say(target, message)
        }
    }

    emulateKeyPress(command: string) {

        emulateInput.emulateKeypress(command);
    }
};