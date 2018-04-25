const {Sequelize,db} = require('./db');

const Resource = db.define('resource', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Please provide a name.'
            }
        },
    },
    description: {
        type: Sequelize.STRING,
    },
    url: {
        type: Sequelize.STRING,
        validate: {
            isURL: {
                args: false,
                msg: 'Please provide a URL.'
            }
        }
    }
});

module.exports = {Sequelize, db, Resource};