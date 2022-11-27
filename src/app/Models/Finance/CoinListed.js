import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CoinListed = new Schema({
	fiat: [String],
	crypto_currency: [String]
});

export default mongoose.model("CoinListed", CoinListed);