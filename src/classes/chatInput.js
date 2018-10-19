"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tmi = require('tmi.js');
var input_1 = require("../configuration/input");
var emulateInput_1 = require("../classes/emulateInput");
var emulateInput = new emulateInput_1.default('snes');
var ChatInput = (function () {
    function ChatInput(opts) {
        this.commandPrefix = '!';
        this.opts = opts;
        this.client = new tmi.client(this.opts);
        this.knownCommands = Object.keys(input_1.default.snes);
        this.client.connect();
        this.registerHandlers();
    }
    ChatInput.prototype.registerHandlers = function () {
        this.client.on('message', this.onMessageHandler.bind(this));
        this.client.on('connected', this.onConnectedHandler);
        this.client.on('disconnected', this.onDisconnectedHandler);
    };
    ChatInput.prototype.onMessageHandler = function (target, context, message, self) {
        if (self) {
            return;
        }
        if (message.substr(0, 1) === this.commandPrefix) {
            var parsedMessage = message.substr(1);
            if (this.knownCommands.indexOf(parsedMessage) > -1) {
                this.emulateKeyPress(parsedMessage);
            }
        }
    };
    ChatInput.prototype.onConnectedHandler = function (address, port) {
        console.log("* Connected to " + address + ":" + port);
    };
    ChatInput.prototype.onDisconnectedHandler = function (reason) {
        console.log("Disconnected: " + reason);
    };
    ChatInput.prototype.sendMessage = function (target, context, message) {
        if (context['message-type'] === 'whisper') {
            this.client.whisper(target, message);
        }
        else {
            this.client.say(target, message);
        }
    };
    ChatInput.prototype.emulateKeyPress = function (command) {
        emulateInput.emulateKeypress(command);
    };
    return ChatInput;
}());
exports.default = ChatInput;
;
