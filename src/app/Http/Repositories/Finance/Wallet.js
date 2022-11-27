import WalletModel from "../../../Models/Finance/Wallet.js";
import CoinListedModel from "../../../Models/Finance/CoinListed.js";
import DepositModel from "../../../Models/Finance/Deposit.js";

import {v4 as uuidv4} from "uuid";

class WalletRepository {

	async coinListed () {
		const findListedCoin = await CoinListedModel.find({});

		if (findListedCoin.length === 0)
			await CoinListedModel.create({
				fiat: [
					"brl",
					"usd",
					"eur"
				],
				crypto_currency: [
					"btc",
					"eth",
					"ltc",
					"ada"
				]
			});
	}

	async createWallet(user_id, oder_id) {
		return await WalletModel.create({
			user_id: user_id,
			wallet_id: uuidv4(),
			oder_id: oder_id ?? null,
			status: "generated",
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: null,
			brl: 0,
			usd: 0,
			eur: 0,
			btc: 0,
			eth: 0,
			ltc: 0,
			ada: 0
		});
	}

	async balance(user_id) {
		const balance = await WalletModel.findOne({user_id: user_id, deleted_at: null});

		if (! balance )
			return false;

		return balance;
	}

	async existCoin(existCoin) {
		
		const find = await CoinListedModel.find({ fiat: {$elemMatch: {$eq: existCoin }}});

		if (! find.length === 0)
			return false;

		return true;
	}

	async deposit(wallet_id, coin, value, wallet_value) {
		const update = await WalletModel.updateOne({_id: wallet_id, deleted_at: null}, {
			[coin]: parseFloat(wallet_value) + parseFloat(value), updated_at: new Date() });

		if (update.matchedCount === 1)
			return true;

		return false;
	}

	async createLogToDeposit(wallet_id, oder_id, value) {
		return await DepositModel.create({
			wallet_id: wallet_id,
			oder_id: oder_id,
			value: Number(value),
			transaction_id: uuidv4(),
			status: "success",
			created_at: new Date(),
			updated_at: new Date(),
		});
	}
}

export default new WalletRepository;