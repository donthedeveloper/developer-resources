const {Sequelize,db} = require('./db');

const Resource = db.define('resource', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: '',
        validate: {
            notEmpty: {
                args: true,
                msg: 'Please provide a name.'
            },
            isUnique(name, next) {
                Category.findOne({
                    where: {name}
                })
                .then((category) => {
                    const error = category ? new Error('This category name already exists.') : null;
                    return next(error);
                })
                .catch((err) => {
                    return next(err);
                });
            }
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