"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var au = require('autoit');
var input_1 = require("../configuration/input");
var EmulateInput = (function () {
    function EmulateInput(emulator) {
        au.Init();
        this.inputConfig = input_1.default[emulator];
    }
    EmulateInput.prototype.emulateKeypress = function (key) {
        if (this.isValidateInput(key)) {
            var keyTopress = this.convertKey(key);
            au.Send(keyTopress);
        }
    };
    EmulateInput.prototype.isValidateInput = function (key) {
        var inputKeys = Object.keys(this.inputConfig);
        if (inputKeys.indexOf(key.toLowerCase()) === -1) {
            return false;
        }
        ;
        return true;
    };
    EmulateInput.prototype.convertKey = function (key) {
        var emulatorKey = this.inputConfig[key];
        return emulatorKey.toLocaleLowerCase();
    };
    return EmulateInput;
}());
exports.default = EmulateInput;
