import app from "../src/app";
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import { request, expect } from 'chai';

chai.use(chaiHttp);

describe('Index API Request', () => {
    it('should return response on call', () => {
        return request(app).get('/')
            .then(res => {
                expect(res.text).to.eql("I'm Up And Running");
            })
    })
})