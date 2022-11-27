import FinanceServices from "../../Services/Finance/Finance.js";

class WalletController {

	async createWallet(req, res) {
		const {token} = req.body.body;
		const {oder_id} = req.body.body;

		const returnMessage = await FinanceServices.createWallet(token, oder_id);

		return res.status(returnMessage.statuscode).json(returnMessage.message); 
	}

	async balance(req, res) {
		const {token} = req.body.body;

		const returnMessage = await FinanceServices.balance(token);

		return res.status(returnMessage.statuscode).json(returnMessage.message); 
	}

	async deposit(req, res) {
		const {token} = req.body.body;
		const {oder_id} = req.body.body;
		let {coin, value} = req.body.body;

		const returnMessage = await FinanceServices.deposit(token, oder_id, coin.toLowerCase(), value);

		return res.status(returnMessage.statuscode).json(returnMessage.message); 
	}
}

export default new WalletController;