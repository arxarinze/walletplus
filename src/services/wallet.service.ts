var db = require('../models');
export class WalletService {
    private readonly _saltRounds = 12
    async createWallet(data: any, transaction = null) {
        let Wallet = db.Wallet;
        try {
            await Wallet.create({
                user_id: data.user_id,
                name: data.name,
                description: data.description
            },
            {
                transaction
            }
            );
            return {
                message: "Wallet Created",
                status: 200
            }
        } catch (error) {
            return {
                message: "Error Occured",
                status: 500
            }
        }
    }

}