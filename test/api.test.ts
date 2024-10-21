import { use } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/server';
import { describe, it, beforeEach } from 'mocha';

const chai = use(chaiHttp);
const { expect } = chai;

describe('API Tests', () => {
    let createdUserId: string;

    beforeEach((done) => {
        done();
    });

    it('should return an empty array when getting all users', (done) => {
        chai
            .request(server)
            .get('/api/users')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').that.is.empty;
                done();
            });
    });

    it('should create a new user with POST api/users', (done) => {
        const newUser = {
            username: 'John Doe',
            age: 25,
            hobbies: ['reading', 'gaming'],
        };

        chai
            .request(server)
            .post('/api/users')
            .send(newUser)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('id');
                expect(res.body.username).to.equal(newUser.username);
                createdUserId = res.body.id;
                done();
            });
    });

    it('should get the created user by id with GET api/users/{userId}', (done) => {
        chai
            .request(server)
            .get(`/api/users/${createdUserId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id').that.equals(createdUserId);
                done();
            });
    });

    it('should update the created user with PUT api/users/{userId}', (done) => {
        const updatedUser = {
            username: 'John Smith',
            age: 30,
            hobbies: ['writing', 'hiking'],
        };

        chai
            .request(server)
            .put(`/api/users/${createdUserId}`)
            .send(updatedUser)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.username).to.equal(updatedUser.username);
                expect(res.body.age).to.equal(updatedUser.age);
                done();
            });
    });

    it('should delete the created user with DELETE api/users/{userId}', (done) => {
        chai
            .request(server)
            .delete(`/api/users/${createdUserId}`)
            .end((err, res) => {
                expect(res).to.have.status(204);
                done();
            });
    });

    it('should return 404 when trying to get the deleted user', (done) => {
        chai
            .request(server)
            .get(`/api/users/${createdUserId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message', 'User not found');
                done();
            });
    });
});
