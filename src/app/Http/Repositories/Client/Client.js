import WalletModel from "../../../Models/Finance/Wallet.js";

class ClientRepository {

	async existUserId(user_id) {
		try {
            
			const existClient = await WalletModel.findOne({user_id: user_id, deleted_at: null});
    
			if (! existClient)
				return false;
    
			return existClient;

		} catch (e) {
			return false;
		}
	}
}

export default new ClientRepository;