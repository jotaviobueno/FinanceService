import jwt, { decode } from "jsonwebtoken";

import storage from "../../../config/storage.js";

export default function decodeJwtToken(token) {
	try {

		var decoded = jwt.verify(token, storage.jwt_secret);
		
		if (new Date() > new Date(decoded.exp)) 
			return false;

		if (decoded.data)
			return decoded.data;

		return false;

	} catch (e) {
		return false;
	}
}