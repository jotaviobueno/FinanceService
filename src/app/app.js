import cors from "cors";

import {financeRoutes} from "../Routes/Finance.js";

export default function Application (app, express) {
	
	// express uses middleware
	app.use(cors());
	
	app.use(express());
	
	app.use(express.urlencoded({ extended: true }));
	
	app.use(express.json({limit: "50mb"}));

	// set routes
	app.use("/", financeRoutes);
	
	// app.use("/", articleRoutes);
}