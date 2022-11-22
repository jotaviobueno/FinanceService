import WalletServices from "../../Services/Finance/Wallet.js";

class WalletController {

	async createWallet(req, res) {
		const {token} = req.body.body;

		console.log(req.body.body);

		const returnMessage = await WalletServices.createWallet(token);

		return res.status(returnMessage.statuscode).json(returnMessage.message); 
	}
}

export default new WalletController;