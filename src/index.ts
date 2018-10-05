import EmulateInput from './classes/emulateInput'
const emulateInput = new EmulateInput('snes');

setInterval(() => {

	emulateInput.emulateKeypress('up');
}, 1000);