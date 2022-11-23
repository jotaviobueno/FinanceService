import {Router} from "express";

export const financeRoutes = Router();

import WalletController from "../app/Http/Controller/Finance/Wallet.js";

financeRoutes.post("/create-wallet", WalletController.createWallet );
financeRoutes.post("/balance", WalletController.balance );