require('dotenv').config();
const {db, User, Role, Permission, Resource, Category} = require('./index');

const chalk = require('chalk');

// Users
const users = [
    {
        email: 'don@test.com',
        password: 'test',
        first_name: 'don',
        last_name: 'hansen'
    }
];

const roles = [
    {
        name: 'user'
    },
    {
        name: 'admin'
    }
];

// PERMISSION CONSTANTS
const USERADD = 'user_add';
const USEREDIT = 'user_edit';
const USERDELETE = 'user_delete';

const permissions = [
    {name: USERADD},
    {name: USEREDIT},
    {name: USERDELETE}
];


// Resources
const resources = [{
    name: 'JS Stuff',
    description: 'Lots of JS stuff.',
    url: 'https://jsstuff.com'
},
{
    name: 'PHP Stuff',
    description: 'Lots of lots of lots of PHP stuff.',
    url: 'https://phpstuff.com'
}];

const categories = [{
    name: 'JavaScript'
}, {
    name: 'CSS'
}];


db.sync({force:true})
    .then(() => {
        console.log(chalk.blue('Dropped old data.'));
        // CREATE ROLES
        return Role.bulkCreate(roles, {individualHooks: true});
    })
    .then(() => {
        console.log(chalk.blue('Created roles.'));
        return Permission.bulkCreate(permissions, {individualHooks: true});
    })
    .then((permissions) => {
        console.log(chalk.blue('Created permissions.'));
        permissions.forEach((permission) => {
            const roleIdArr = [];
            switch (permission.name) {
                case USERADD:
                    roleIdArr.push(1, 2);
                    break;
                case USEREDIT:
                    roleIdArr.push(1, 2);
                    break;
                case USERDELETE:
                    roleIdArr.push(2);
                    break;
            }

            roleIdArr.forEach((roleId) => {
                permission.addRole(roleId);
            });
        })
    })
    .then(() => {
        console.log(chalk.blue('Associated roles with permissions.'));
        // CREATE USERS
        return User.bulkCreate(users, {individualHooks: true})
    })
    .then(() => {
        console.log(chalk.blue('Created users.'));
        return Resource.bulkCreate(resources, {individualHooks: true});
    })
    .then(() => {
        console.log(chalk.blue('Created resources.'));
        return Category.bulkCreate(categories, {individualHooks: true});
    })
    .finally(() => {
        console.log(chalk.blue('Created categories.'));
        db.close();
    })
    .catch((err) => {
        console.error('There was totally a problem:', err);
    });