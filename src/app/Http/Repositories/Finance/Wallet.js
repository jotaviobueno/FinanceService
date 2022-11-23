import WalletModel from "../../../Models/Finance/Wallet.js";

import {v4 as uuidv4} from "uuid";

class WalletRepository {

	async createWallet(user_id, order_id) {
		return await WalletModel.create({
			user_id: user_id.data,
			wallet_id: uuidv4(),
			order_id: order_id ?? null,
			status: "generated",
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: null,
			balance: {
				fiat: [
					{
						brl: 0,
						usd: 0,
						eur: 0
					}
				],
				crypto_currency: [
					{
						btc: 0,
						eth: 0,
						ltc: 0,
						ada: 0
					}
				]
			}
		});
	}

	async balance(user_id) {
		const balance = await WalletModel.findOne({user_id: user_id, deleted_at: null});

		if (! balance )
			return false;

		return balance;
	}
}

export default new WalletRepository;