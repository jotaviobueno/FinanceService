import FinanceRepository from "../../Repositories/Finance/Wallet.js";
import ClientRepository from "../../Repositories/Client/Client.js";

import decodeJWTToken from "../../../Utils/Auth/DecodeJWTToken.js";

class FinanceServices {

	async createWallet(token, oder_id) {
     
		await FinanceRepository.coinListed();

		let user_id;

		if (! (user_id = decodeJWTToken(token) ))
			return { statuscode: 401, message: { error: "not authorized." } };

		let oder;

		if (oder_id)
			oder = decodeJWTToken(oder_id);

		let wallet;

		if ((wallet = await FinanceRepository.createWallet(user_id, oder))) 
			return { statuscode: 201, message: { success: "wallet as been created.", wallet } };
        
		return { statuscode: 400, message: { error: "We were unable to complete your request" } };
	}

	async balance(token) {

		let user_id;

		if (! (user_id = decodeJWTToken(token) ))
			return { statuscode: 401, message: { error: "not authorized." } };

		let wallet;

		if ((wallet = await FinanceRepository.balance(user_id))) 
			return { statuscode: 201, message: { 
				brl: wallet.brl,
				usd: wallet.usd,
				eur: wallet.eur,
				btc: wallet.btc,
				eth: wallet.eth,
				ltc: wallet.ltc,
				ada: wallet.ada,
			}};

		return { statuscode: 400, message: { error: "We were unable to complete your request" } };
	}

	async deposit(token, oder, coin, value) {

		let user_id;

		if (! (user_id = decodeJWTToken(token) ))
			return { statuscode: 401, message: { error: "invalid token." } };

		let wallet;

		if (! (wallet = await ClientRepository.existUserId(user_id)))
			return { statuscode: 403, message: { error: "not authorized." } };
		
		let oder_id;

		if (! (oder_id = decodeJWTToken(oder) ))
			return { statuscode: 401, message: { error: "not authorized." } };

		let Value;

		if (! (Value = decodeJWTToken(value) ))
			return { statuscode: 422, message: { error: "value informed its invalid" } };

		if (! await FinanceRepository.existCoin(coin))
			return { statuscode: 422, message: { error: "coin name not exist" } };

		if (await FinanceRepository.deposit(wallet._id, coin, Value, wallet[coin], oder_id)) {

			const depositLog = await FinanceRepository.createLogToDeposit(wallet.wallet_id, oder_id, Value);

			return { statuscode: 200, message: { 
				wallet_id: depositLog.wallet_id,
				oder_id: depositLog.oder_id,
				value: depositLog.value,
				transaction_id: depositLog.transaction_id,
				status: depositLog.status,
			}};
		}

		return { statuscode: 401, message: { error: "not authorized." } };
	}
}

export default new FinanceServices;