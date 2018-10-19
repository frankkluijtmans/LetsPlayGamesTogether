"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emulateInput_1 = require("./classes/emulateInput");
var emulateInput = new emulateInput_1.default('snes');
setInterval(function () {
    emulateInput.emulateKeypress('up');
}, 1000);
