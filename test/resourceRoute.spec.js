const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
chai.use(chaiHttp);
const {Resource} = require('../server/models');

describe('\'/\' Resource', () => {
    describe('GET REQUEST', () => {
        it('responds with a status code of 200', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('POST REQUEST', () => {
        const testResourceName = 'testResourceName';

        it('responds with status code of 201', (done) => {
            chai.request(app)
                .post('/', {
                    name: testResourceName
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('responds with a status code of 400 when creating a resource with a name that already exists', (done) => {
            
        });

        afterEach(function() {
            Resource.destroy({
                where: {
                    name: testResourceName
                }
            })
            .catch((err) => {
                console.error(err);
            });
        })
    })
});