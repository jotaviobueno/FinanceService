import WalletRepository from "../../Repositories/Finance/Wallet.js";

import decodeJWTToken from "../../../Utils/Auth/DecodeJWTToken.js";

class WalletServices {

	async createWallet(token, order_id) {
     
		let user_id;

		if (! (user_id = decodeJWTToken(token) ))
			return { statuscode: 401, message: { error: "not authorized." } };

		let wallet;

		if ((wallet = await WalletRepository.createWallet(user_id, order_id))) 
			return { statuscode: 201, message: { success: "wallet as been created.", wallet } };
        
		return { statuscode: 400, message: { error: "We were unable to complete your request" } };
	}

	async balance(token) {

		let user_id;

		if (! (user_id = decodeJWTToken(token) ))
			return { statuscode: 401, message: { error: "not authorized." } };

		let wallet;

		if ((wallet = await WalletRepository.balance(user_id))) 
			return { statuscode: 201, message: { 
				fiat: wallet.balance.fiat,
				crypto_currency: wallet.balance.crypto_currency

			}};

		return { statuscode: 400, message: { error: "We were unable to complete your request" } };
	}
}

export default new WalletServices;