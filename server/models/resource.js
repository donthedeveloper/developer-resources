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
        /* TODO: this works, next, create a model setter
        Try this: create a hook that calls a model 
        method before validate and sets undefined, etc to whatever you need it to */
        set: function(value) {
            this.setDataValue('name', '');
        }
    },
    description: {
        type: Sequelize.STRING,
    },
    url: {
        type: Sequelize.STRING,
        // allowNull: false,
        validate: {
            // notNull: {
            //     args: true,
            //     msg: 'URL cannot be blank.'
            // },
            isURL: {
                args: false,
                msg: 'Please provide a URL.'
            }
        }
    }
});

module.exports = {Sequelize, db, Resource};