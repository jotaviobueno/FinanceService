import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Wallet = new Schema({

	user_id: { type: Object, required: true, },
	wallet_id: { type: String, required: true, },
	oder_id: { type: String },
	status: { type: String, required: true },
	created_at: { type: Date, default: Date.now, required: true },
	updated_at: { type: Date, required: true },
	deleted_at: { type: Date, default: Date.now },
	fixed_error: [
		{
			type: { type: String },
			description: { type: String }, 
		}
	],
});

export default mongoose.model("Wallet", Wallet);