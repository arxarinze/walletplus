var db = require('../models');
import * as bcrypt from 'bcrypt'
import { ValidationError } from 'sequelize';
import jsonWebToken from '../utils/jsonWebToken';
export class TransactionService {
    public transferId: any = null;
    async fundWallet(data: any) {
        let Transaction = db.Transaction;
        let normal = await db.Wallet.findOne({ where: { user_id: data.user_id, name: 'normal' } })
        let point = await db.Wallet.findOne({ where: { user_id: data.user_id, name: 'point' } })
    
        try {
            if (data.amount < 5000) {
                await Transaction.create({
                    user_id: data.user_id,
                    wallet_id: normal.id,
                    type: "credit",
                    description: data.description,
                    amount: data.amount
                });
                return {
                    message: "Wallet Has Been Funded With " + data.amount,
                    status: 200,
                }
            }
            else {
                try {
                    await db.sequelize.transaction(async (transaction: any) => {
                    

                        await Transaction.create({
                            user_id: data.user_id,
                            wallet_id: normal.id,
                            type: "credit",
                            description: data.description,
                            amount: data.amount
                        }, {
                            transaction
                        });
                        let pointAwarded = (() => {
                            if (data.amount <= 10000) {
                                return (1 / 100) * data.amount;
                            }
                            else if (data.amount > 10000 && data.amount <= 25000) {
                                return ((25 / 10) / 100) * data.amount;
                            }
                            else if (data.amount > 25000) {
                                let amount = (5 / 100) * data.amount;
                                if (amount <= 5000) {
                                    return amount;
                                }
                                else {
                                    return 5000;
                                }
                            }
                        })();
                        await Transaction.create({
                            user_id: data.user_id,
                            wallet_id: point.id,
                            type: "credit",
                            description: data.description,
                            amount: pointAwarded
                        }, {
                            transaction
                        });
                    });
                } catch (error) {
                    console.log(error);
                }
                return {
                    message: "Wallet Has Been Funded With " + data.amount,
                    status: 200,
                }
            }
        } catch (error) {
            return {
                message: "An Error Occured",
                status: 500
            }
        }
    }
    async getAll(){
        
    }
    async checkBalance(userId:number){
        let walletId = await db.Wallet.findOne({ where: { user_id: userId, name: 'normal' } })
        let pointId = await db.Wallet.findOne({ where: { user_id: userId, name: 'point' } })
        let credit = await db.Transaction.findAll({
            where:{
                user_id: userId,
                wallet_id: walletId.id,
                type:'credit'
            }
        })
        let debit = await db.Transaction.findAll({
            where:{
                user_id: userId,
                wallet_id: walletId.id,
                type:'debit'
            }
        })
        let points = await db.Transaction.findAll({
            where:{
                user_id: userId,
                wallet_id: pointId.id,
            }
        })
        let totalDebit = 0
        let totalCredit = 0
        let totalPoint = 0
        points.map((amount: any)=>{
            totalPoint = totalPoint + parseFloat(amount.amount);
        })
        credit.map((amount: any)=>{
            totalCredit = totalCredit + parseFloat(amount.amount);
        })
        debit.map((amount: any)=>{
            totalDebit = totalDebit + parseFloat(amount.amount);
        })
        return {
            total: totalCredit-totalDebit,
            points: totalPoint
        }

    }
    async getTotalBalance(){

    }
    async transfer(data: any) {
        let Transaction = db.Transaction;
        let normal = await db.Wallet.findOne({ where: { user_id: data.user_id, name: 'normal' } })
        let point = await db.Wallet.findOne({ where: { user_id: data.user_id, name: 'point' } })
        let checkTouser = await db.User.findOne({ where: { email: data.to_user } });
        if (!checkTouser) {
            return {
                message: "To address doesnt exist",
                status: 404
            }
        }
        if(
            checkTouser.id == data.user_id
        ){
            return {
                message: "Can't Transfer To Yourself",
                status: 422
            } 
        }
        console.log((await this.checkBalance(data.user_id)));
        if((await this.checkBalance(data.user_id)).total < data.amount){
            return {
                message: "Insufficient Funds",
                status: 422
            }
        }
        try {
            await db.sequelize.transaction(async (transaction: any) => {
                this.transferId = await db.Transfer.create({
                    to: checkTouser.id,
                    from: data.user_id,
                    amount: data.amount
                }, {
                    transaction
                });
                await Transaction.create({
                    user_id: data.user_id,
                    wallet_id: normal.id,
                    type: "debit",
                    description: data.description,
                    amount: data.amount
                });
                await this.fundWallet({
                    user_id: checkTouser.id,
                    description: data.description,
                    amount: data.amount
                })
            });
            return {
                message: "Transfer Successful",
                status: 200,
                data: this.transferId?.id
            }
        } catch (error) {
            console.log(error)
            return {
                message: "Error Occured",
                status: 500,
                data: null
            }
        }
    }
}