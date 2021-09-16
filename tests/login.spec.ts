import app from "../src/app";
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { request, expect } from 'chai';
var db = require("../src/models");
chai.use(chaiHttp);
describe('Login User', () => {
    it('register,login a user then delete the user', async () => {
            const res1 = await request(app)
            .post('/auth/login')
            // send user login details
            .send({
                'email': 'rxarinze@live.com',
                'password': 'password2020@'
            });
            expect(res1.status).to.eql(200);
    })
})