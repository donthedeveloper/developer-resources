const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
// chai.use(chaiHttp);
const {Category} = require('../server/models');

describe('Category Model', () => {
    describe('Add a resource to the database', () => {
        const categoryName = 'TestCategoryName';

        it('responds with the object that was created when successful', (done) => {
            Category.create({
                name: categoryName
            })
            .then((category) => {
                expect(category.get('name')).to.equal(categoryName);
                done();
            })
            .catch((err) => {
                done(err);
            });
        });

        it('does not allow creation when name is not provided as a key', (done) => {
            Category.create()
            .then((category) => {
                done('Invalidation of name did not work.');
            })
            .catch((err) => {
                if (err.errors[0].message) {
                    done();
                }
            });
        });

        it('does not allow an empty string for the key', (done) => {
            Category.create()
            .then((category) => {
                done('Invalidation of name did not work.');
            })
            .catch((err) => {
                if (err.errors[0].message) {
                    done();
                }
            });
        });

        it('does not allow duplicate names', (done) => {
            Category.create({
                name: categoryName
            })
            .catch((err) => {
                console.error(err);
            });

            Category.create()
            .then((category) => {
                done('Invalidation of name did not work.');
            })
            .catch((err) => {
                if (err.errors[0].message) {
                    done();
                }
            });
        });

        afterEach(function() {
            Category.destroy({
                where: {
                    name: categoryName
                }
            })
            .catch((err) => {
                console.error(err);
            });
        })
    });
});