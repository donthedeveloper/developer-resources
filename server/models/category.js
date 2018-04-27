const {Sequelize, db} = require('./db');

const Category = db.define('category', {
    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Please provide a name.'
            }
        }
    }
})

module.exports = {Sequelize, db, Category};