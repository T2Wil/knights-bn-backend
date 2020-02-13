import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

describe('Create a user account.(POST) ', () => {
  it('it should return 201 on successful signup', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.user1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
  it('it should return 409 if user exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.user1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.error).to.equal('user already exits. Please try again with a different email or passportNumber address');
        done();
      });
  });
  it('it should return 422 for invalid firstName', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.incorectFirstName)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.error).to.equal('firstName should have a minimum of 3 characters, no symbols allowed and no space inbetween');
        done();
      });
  });
  it('it should return 422 for invalid lastName', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.incorectlastName)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.error).to.equal('lastName should have a minimum of 3 characters, no symbols allowed and no space inbetween');
        done();
      });
  });
  it('it should return 422 for invalid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.incorectEmail)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.error).to.equal(' email must be a valid email');
        done();
      });
  });
  it('it should return 422 for invalid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.invalidPassport)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.error).to.equal('passportNumber should be made of 8 or 9 alphanumeric characters, no symbols allowed and no space inbetween');
        done();
      });
  });
});