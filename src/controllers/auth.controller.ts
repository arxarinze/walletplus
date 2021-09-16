import { check, validationResult } from "express-validator";
import { UserService } from "../services/user.service";
import { WalletService } from "../services/wallet.service";

var db = require('../models');
export class AuthController {
    async register(req: any, res: any) {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            res.send({ error });
        }
        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        const gender = req.body.gender;
        let payload = {
            email, password, firstName, lastName, gender
        }
        let result: any = {};

            db.sequelize.transaction(async (t: any) => {
                result = await new UserService().registerUser(payload, t);
                if (result.status == 200) {
                    await new WalletService().createWallet({
                        name: 'normal',
                        user_id: result.data.id,
                        description: "Normal Wallet"
                    }, t);
                    await new WalletService().createWallet({
                        name: 'point',
                        user_id: result.data.id,
                        description: "Points Wallet"
                    }, t);
                }
                res.status(result.status).json({
                    message: result.message, data: {
                        id: result?.data?.id
                    }
                });
            })

    }

    async login(req: any, res: any) {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            res.send({ error });
        }
        const email = req.body.email;
        const password = req.body.password;
        let payload = {
            email, password
        }
        let result: any = await new UserService().loginUser(payload);
        res.status(result.status).json({ message: result.message, token: result.token });
    }

}