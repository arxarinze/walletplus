var db = require('../models');
import * as bcrypt from 'bcrypt'
import { ValidationError } from 'sequelize';
import jsonWebToken from '../utils/jsonWebToken';
export class UserService {
    private readonly _saltRounds = 12
    async registerUser(data: any, transaction = null) {

        let User = db.User;
        try {
            let user = await User.create({
                first_name: data.firstName,
                last_name: data.lastName,
                password: bcrypt.hashSync(data.password, this._saltRounds),
                email: data.email,
                gender: data.gender,
            }, {
                transaction
            });
            return {
                message: "Registered Successfully",
                status: 200,
                data: user 
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                return {
                    message: "User Already Exists. Login To Proceed",
                    status: 422
                }
            }
            else {
                return {
                    message: "An Error Occured",
                    status: 500
                }
            }

        }
    }
    async loginUser(data: any) {
        let User = db.User;
        let email = data.email;
        let password = data.password;
        try {
            let user = await User.findOne({ where: { email } });;

            if(bcrypt.compareSync(password, user.password)){
                return {
                    message: "Successful Login",
                    status: 200,
                    token: jsonWebToken.generateToken({id:user.id, email:user.email, gender:user.gender})
                }
            }
            else{
                return {
                    message: "Invalid Credentials",
                    status: 403,
                    token: null
                } 
            }
        } catch (error) {
            return {
                message: "Invalid Credentials",
                status: 403,
                token: null
            }
        }


    }
}