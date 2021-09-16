import { check, validationResult } from "express-validator";
import { TransactionService } from "../services/transaction.service";

var db = require('../models');
export class TransactionController {
    async fundWallet(req: any, res: any) {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            res.send({ error });
        }
        const user_id = req.user.id;
        const amount = req.body.amount;
        const description = req.body.description;
        let payload = {
            user_id, description, amount
        }
        let result: any = await new TransactionService().fundWallet(payload);
        res.status(result.status).json({
            message: result.message
        });
    }
    async transfer(req: any, res: any) {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            res.send({ error });
        }
        const user_id = req.user.id;
        const to_user = req.body.user;
        const amount = req.body.amount;
        const description = req.body.description;
        let payload = {
            user_id, to_user, description, amount
        }
        let result: any = await new TransactionService().transfer(payload);
        res.status(result.status).json({
            message: result.message,
            data: {
                transferId: result?.data
            }
        });
    }
    async balance(req: any, res: any) {
        const user_id = req.user.id;
        try {
            let result: any = await new TransactionService().checkBalance(user_id);
            res.status(200).json({
                data: {
                    balanceTotal: result.total,
                    points: result.points
                }
            });
        } catch (error) {

        }
    }
    async getAll(req: any, res: any) {
        const user_id = req.user.id;
        let limit = 50;   // number of records per page
        let offset = 0;
        let page = req.params.page;      // page number
        try {
            await new TransactionService().getAll(user_id, page, limit,offset, res);
        } catch (error) {
            return {
                status: 500,
                message: "An Error Occured"
            }
        }
    }
}