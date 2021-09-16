import app from "../src/app";
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { request, expect } from 'chai';
var db = require("../src/models");
chai.use(chaiHttp);

describe('Fund Wallet', () => {
    let token:any = null
    beforeEach(async() => {
        const res1 = await request(app)
            .post('/auth/login')
            // send user login details
            .send({
                'email': 'rxarinze@live.com',
                'password': 'password2020@'
            });
            token = res1.body.token;
       });
    it('should register a user, login, fund the user walllet, then delete the user', async() => {
        const res1 = await request(app)
            .post('/transaction/fund-wallet')
            .set('Authorization', 'Bearer ' + token)
            // send user login details
            .send({
                'amount': 600000,
                'password': 'Deposit From PayPal'
            });
        expect(res1.status).to.eql(200);
    })
})