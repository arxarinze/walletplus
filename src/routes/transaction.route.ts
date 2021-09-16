import { Router } from "express";
import { check } from "express-validator";
import { TransactionController } from "../controllers/transaction.controller";
import authMiddleware from "../middleware/auth.middleware";
const transaction = Router();
const transactionController = new TransactionController();
transaction.post('/fund-wallet', [
    check('amount').isNumeric(),
    check('description').isLength({ min: 1 }).trim().escape()
],authMiddleware, transactionController.fundWallet);
transaction.post('/transfer', [
    check('amount').isNumeric(),
    check('description').isLength({ min: 1 }).trim().escape(),
    check('user').isLength({ min: 1 }).trim().escape()
],authMiddleware, transactionController.transfer);

transaction.get('/balance', authMiddleware, transactionController.balance);
transaction.get('/', authMiddleware, transactionController.getAll)


export default transaction