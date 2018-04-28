const {Sequelize,db} = require('./db');

const Resource = db.define('resource', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Please provide a name.'
            },
            // TODO: reference for custom validation
            // isUnique(name) {
            //     Category.findOne({
            //         where: {name}
            //     })
            //         .then((category) => {
            //             console.log(category);
            //             if (category) {
            //                 throw new Error('This category name already exists.');
            //             }
            //         })
            // }
        },
    },
    description: {
        type: Sequelize.STRING,
    },
    url: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isURL: {
                args: false,
                msg: 'Please provide a URL.'
            }
        }
    }
});

module.exports = {Sequelize, db, Resource};