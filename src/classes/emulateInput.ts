import * as robot from 'robotjs';
import validInput from '../configuration/validInput';

export default class EmulateInput {

	public hello: string;
	private validKeys: Array<2>;

    /**
     * @param {} 
     */
	constructor() {

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
			this.emulateKey(keyTopress);
		}
	}

	/**
	 * 
	 * @param key:string 
	 * 
	 * @return {boolean}
	 */
	isValidateInput(key: string) {

		//if not valid, then return false
		if (validInput.indexOf(key.toLowerCase()) === -1) {

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

		return key.toLocaleLowerCase();
	}

	/**
	 * 
	 * actualy emulate the keypress
	 * 
	 * @param {string} key to emulate 
	 * 
	 * @return {void}
	 */
	emulateKey(key: string) {

		robot.keyTap(key);
	}

}