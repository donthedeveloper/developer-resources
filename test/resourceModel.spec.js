const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const {Resource} = require('../server/models');

describe('Resource Model', () => {
    describe('Add a resource to the database', () => {
        const testResource = 'testResource';
        const testDescription = 'test description';
        const testUrl = 'https://donthedeveloper.tv';

        it('responds with the object that was created when successful', (done) => {
            Resource.create({
                name: testResource,
                description: testDescription,
                url: testUrl
            })
            .then((resource) => {
                expect(resource.get('name')).to.equal(testResource);
                done();
            });
        });

        it ('sends appropriate error response when name field is never sent in body', (done) => {
            Resource.create({
                description: testDescription,
                url: testUrl
            })
            .then(() => {
                done('Invalidation of name did not work.');
            })
            .catch((err) => {
                if (err.errors[0].message) {
                    done();
                }
            });
        });

        it ('sends error response when name field value is blank', (done) => {
            Resource.create({
                name: '',
                description: testDescription,
                url: testUrl
            })
            .then(() => {
                done('Invalidation of name did not work.');
            })
            .catch((err) => {
                if (err.errors[0].message) {
                    done();
                }
            });
        });

        it ('sends error response when name field is a duplicate entry', (done) => {
            Resource.create({
                name: testResource,
                description: testDescription,
                url: testUrl
            })
            .then((resource) => {
                Resource.create({
                    name: testResource,
                    description: testDescription,
                    url: testUrl
                })
                .then(() => {
                    done('Invalidation of name did not work.');
                })
                .catch((err) => {
                    if (err.errors[0].message) {
                        done();
                    }
                });
            });
        });

        afterEach(function() {
            Resource.destroy({
                where: {
                    name: testResource
                }
            })
            .catch((err) => {
                console.error(err);
            });
        })
    });

    describe('Can get a list of all resources', (done) => {
        const testResourceName1 = 'testResource1';
        const testResourceName2 = 'testResource2';

        beforeEach(() => {
            return Resource.bulkCreate([{
                name: 'testResource1'
            }, {
                name: 'testResource2'
            }])
            .catch((err) => {
                console.error(err);
            })
        });

        it('responds with an array', async () => {
            const resources = await Resource.findAll()
            expect(resources).to.be.an('array')
        });

        xit('contains resource objects inside that array', (done) => {
            Resource.findAll()
            .then((resources) => {
                const resourcesMatched = resources.filter((resource) => {
                    const resourceName = resource.name;
                    return resourceName === 'testResource1' || resourceName === 'testResource2';
                });

                chai.expect(resourcesMatched).to.have.lengthOf(2);
                done();
            })
            .catch((err) => {
                done(err);
            });
        });

        // afterEach(function() {
        //     Resource.destroy({
        //         where: {
        //             name: testResourceName1
        //         }
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });

        //     Resource.destroy({
        //         where: {
        //             name: testResourceName2
        //         }
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });
        // })
    });

    describe('Can update resource', (done) => {

    });
});