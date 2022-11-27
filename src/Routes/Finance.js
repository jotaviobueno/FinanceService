import {Router} from "express";

export const financeRoutes = Router();

import FinanceController from "../app/Http/Controller/Finance/Wallet.js";

financeRoutes.post("/create-wallet", FinanceController.createWallet );
financeRoutes.post("/balance", FinanceController.balance );
financeRoutes.post("/deposit", FinanceController.deposit );
