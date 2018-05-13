const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const {Resource} = require('../server/models');

describe('Resource Model', () => {
    describe('Add a resource to the database', () => {
        const testCategory = 'testCategory';

        it('responds with the object that was created when successful', (done) => {
            Resource.create({
                name: testCategory,
                description: 'test description',
                url: 'https://donthedeveloper.tv'
            })
        });

        it ('sends appropriate error response when name field is never sent in body', (done) => {

        });

        it ('sends appropriate error response when name field value is blank', (done) => {

        });

        it ('sends appropriate error response when name field is a duplicate entry', (done) => {

        });
    });

    describe('Can get a list of all resources', (done) => {
        it('responds with an array', (done) => {

        });

        it('contains resource objects inside that array', (done) => {

        });
    });

    describe('Can update resource', (done) => {

    });
});