const {Sequelize,db,User} = require('./user');
const {Role} = require('./role');
const {Permission} = require('./permission');
const {Resource} = require('./resource');
const {Category} = require('./category');

User.belongsTo(Role);
Role.belongsToMany(Permission, {through: 'RolePermission'});
Permission.belongsToMany(Role, {through: 'RolePermission'});
Resource.belongsTo(Category);
Category.hasMany(Resource);

module.exports = {Sequelize, db, User, Role, Permission, Resource, Category};