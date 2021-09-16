import app from "../src/app";
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { request, expect } from 'chai';
var db = require("../src/models");
chai.use(chaiHttp);

describe('Register User', () => {
    it('should register a user then delete the user', () => {

        return request(app).post('/auth/register')
            .send({
                'first_name': 'Paul',
                'last_name': 'Olugie',
                'gender': 'Male',
                'email': 'rxarinze@live.com',
                'password': 'password2020@'
            })
            .then(res => {
                expect(res.status).to.eql(200);
                let user = db.User;
                user.destroy({
                    where: {
                        id: res.body.data.id
                    }
                });
            })
    })
})