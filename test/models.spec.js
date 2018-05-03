const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const {Category} = require('../server/models');

describe('Category Model', () => {
    describe('Add a category to the database', () => {
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
            .then(() => {
                Category.create({
                    name: categoryName
                })
                .then((category) => {
                    done('Invalidation of name did not work.');
                })
                .catch((err) => {
                    if (err.errors[0].validatorKey === 'isUnique') {
                        done();
                    }
                });
            })
            .catch((err) => {
                console.error(err);
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

    describe('Can get a list of all categories', () => {
        beforeEach(() => {
            Category.bulkCreate([{
                name: 'testCategory1'
            }, {
                name: 'testCategory2'
            }])
            .catch((err) => {
                console.error(err);
            })
        });

        // it('returns an array', (done) => {
        //     Category.findAll()
        //     .then((categories) => {
        //         expect(categories).to.be.an('array');
        //         done();
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //         done(err);
        //     })
        // });

        it('contains category objects inside the array', (done) => {
            Category.findAll()
            .then((categories) => {
                // const nameCheck = categories.every((category) => {
                //     const categoryName = category.name;
                //     console.log('categoryName:', categoryName);
                //     return categoryName && categoryName === 'testCategory1' || categoryName === 'testCategory2';
                // });
                console.log(categories);

                const categoriesMatched = categories.filter((category) => {
                    const categoryName = category.name;
                    return categoryName === 'testCategory1' || categoryName === 'testCategory2';
                })

                chai.expect(categoriesMatched).to.have.lengthOf(2);
                done();
            })
            .catch((err) => {
                done(err);
            })
        })
    })
});