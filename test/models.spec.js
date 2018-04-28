const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
// chai.use(chaiHttp);
const {Category} = require('../server/models');

describe('Category Model', () => {
    describe('Add a resource to the database', () => {
        it('responds with the object that was created', (done) => {
            const categoryName = 'TestCategoryName';

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
    });
});