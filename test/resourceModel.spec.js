// const chai = require('chai');
// const app = require('../app');
// const expect = chai.expect;
// const {Resource} = require('../server/models');

// describe('Resource Model', () => {
//     describe('Add a resource to the database', () => {
//         const testResource = 'testResource';
//         const testDescription = 'test description';
//         const testUrl = 'https://donthedeveloper.tv';

//         it('responds with the object that was created when successful', (done) => {
//             Resource.create({
//                 name: testResource,
//                 description: testDescription,
//                 url: testUrl
//             })
//             .then((resource) => {
//                 expect(resource.get('name')).to.equal(testResource);
//                 done();
//             });
//         });

//         it ('sends appropriate error response when name field is never sent in body', (done) => {
//             Resource.create({
//                 description: testDescription,
//                 url: testUrl
//             })
//             .then(() => {
//                 done('Invalidation of name did not work.');
//             })
//             .catch((err) => {
//                 if (err.errors[0].message) {
//                     done();
//                 }
//             });
//         });

//         it ('sends error response when name field value is blank', (done) => {
//             Resource.create({
//                 name: '',
//                 description: testDescription,
//                 url: testUrl
//             })
//             .then(() => {
//                 done('Invalidation of name did not work.');
//             })
//             .catch((err) => {
//                 if (err.errors[0].message) {
//                     done();
//                 }
//             });
//         });

//         it ('sends error response when name field is a duplicate entry', (done) => {
//             Resource.create({
//                 name: testResource,
//                 description: testDescription,
//                 url: testUrl
//             })
//             .then((resource) => {
//                 Resource.create({
//                     name: testResource,
//                     description: testDescription,
//                     url: testUrl
//                 })
//                 .then(() => {
//                     done('Invalidation of name did not work.');
//                 })
//                 .catch((err) => {
//                     if (err.errors[0].message) {
//                         done();
//                     }
//                 });
//             });
//         });

//         afterEach(function() {
//             Resource.destroy({
//                 where: {
//                     name: testResource
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//         })
//     });

//     describe('Can get a list of all resources', () => {
//         const testResourceName1 = 'testResource1';
//         const testResourceName2 = 'testResource2';

//         beforeEach(() => {
//             return Resource.bulkCreate([{
//                 name: 'testResource1'
//             }, {
//                 name: 'testResource2'
//             }])
//             .catch((err) => {
//                 console.error(err);
//             })
//         });

//         it('responds with an array', async () => {
//             const resources = await Resource.findAll()
//             expect(resources).to.be.an('array')
//         });

//         it('contains resource objects inside that array', async () => {
//             const resources = await Resource.findAll();
//             const resourcesMatched = resources.filter((resource) => {
//                 const resourceName = resource.name;
//                 return resourceName === 'testResource1' || resourceName === 'testResource2';
//             });

//             chai.expect(resourcesMatched).to.have.lengthOf(2);
//         });

//         afterEach(function() {
//             Resource.destroy({
//                 where: {
//                     name: testResourceName1
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });

//             Resource.destroy({
//                 where: {
//                     name: testResourceName2
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//         });
//     });

//     describe('Can update a resource', (done) => {
//         const testResourceName1 = 'testResource1';
//         const testResourceName2 = 'testResource2';
//         const testResourceName3 = 'testResource3';

//         beforeEach(() => {
//             return Resource.bulkCreate([{
//                 name: testResourceName1
//             }, {
//                 name: testResourceName2
//             }])
//             .catch((err) => {
//                 console.error(err);
//             })
//         });

//         it('if we update the name field of a resource with an a valid name, it returns an updated count of 1', async () => {
//             const updatedCount = await Resource.update({
//                 name: testResourceName3
//             }, {
//                 where: {
//                     name: testResourceName1
//                 }
//             });
//             chai.expect(updatedCount).to.be.an('array').that.includes(1);
//         });

//         it('if we update the name field with an incorrect name, it returns an error', (done) => {
//             Resource.update({
//                 name: ''
//             }, {
//                 where: {
//                     name: testResourceName1
//                 }
//             })
//             .then((updatedCount) => {
//                 done('Updated row when it shouldnt have');
//             })
//             .catch((err) => {
//                 chai.expect(err.errors[0].validationError).to.have.length
//                 done();
//             });
//         });

//         afterEach(() => {
//             Resource.destroy({
//                 where: {
//                     name: testResourceName1
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });

//             Resource.destroy({
//                 where: {
//                     name: testResourceName2
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });

//             Resource.destroy({
//                 where: {
//                     name: testResourceName3
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//         });
//     });

//     describe('Can delete a resource', () => {
//         const testResourceName1 = 'testResource1';
//         const testResourceName2 = 'testResource2';

//         beforeEach(() => {
//             return Resource.bulkCreate([{
//                 name: testResourceName1
//             }, {
//                 name: testResourceName2
//             }])
//             .catch((err) => {
//                 console.error(err);
//             })
//         });

//         it('destroy removes a resource', async () => {
//             const destroyedCount = await Resource.destroy({
//                 where: {
//                     name: testResourceName1
//                 }
//             });
//             chai.expect(destroyedCount).to.be.a('number', 1);
//         });

//         afterEach(() => {
//             Resource.destroy({
//                 where: {
//                     name: testResourceName1
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });

//             Resource.destroy({
//                 where: {
//                     name: testResourceName2
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//         });
//     });
// });