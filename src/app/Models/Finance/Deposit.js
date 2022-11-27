import mongoose from "mongoose";

const Schema = mongoose.Schema;

const deposit = new Schema({

	wallet_id: { type: String, required: true, },
	oder_id: { type: String },
	value: { type: Number },
	transaction_id: { type: String },
	status: { type: String, required: true },
	created_at: { type: Date, default: Date.now, required: true },
	updated_at: { type: Date, required: true },
});

export default mongoose.model("deposithistory", deposit);