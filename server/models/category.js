const {Sequelize, db} = require('./db');

const Category = db.define('category', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
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
        }
    }
});

module.exports = {Sequelize, db, Category};