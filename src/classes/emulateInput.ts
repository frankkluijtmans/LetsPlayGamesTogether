import * as robot from 'robotjs';
import input from '../configuration/input';

export default class EmulateInput {

	public hello: string;
	private inputConfig: object;

	constructor(emulator:string){

		this.inputConfig = input[emulator];
	}
	/**
	 * 
	 * start the process of emulating a keypress
	 * 
	 * @param {string}: pressed key
	 * 
	 * @return {void}
	 */
	emulateKeypress(key: string) {

		if (this.isValidateInput(key)) {

			//convert the key to valid input
			const keyTopress = this.convertKey(key);

			//emulute the keypress
			robot.keyTap(keyTopress);
		}
	}

	/**
	 * 
	 * @param key:string 
	 * 
	 * @return {boolean}
	 */
	isValidateInput(key: string) {

		//get all keys of input config
		const inputKeys = Object.keys(this.inputConfig);
		//if not valid, then return false
		if (inputKeys.indexOf(key.toLowerCase()) === -1) {

			return false;
		};

		return true;
	}

	/**
	 * 
	 * converts the key in valid input
	 * 
	 * @param {key}:string the key to convert
	 * 
	 * @return{string} coverted key string 
	 */
	convertKey(key: string) {

		const emulatorKey = this.inputConfig[key];
		return emulatorKey.toLocaleLowerCase();
	}

}