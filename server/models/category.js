const {Sequelize, db} = require('./db');

const Category = db.define('category', {
    name: {
        type: Sequelize.STRING,
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
        }
    }
});

Category.isUnique = function(model) {
    console.log('model:', model);
}

module.exports = {Sequelize, db, Category};