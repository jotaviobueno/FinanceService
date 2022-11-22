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
			deleted_at: null
		});

	}


}

export default new WalletRepository;