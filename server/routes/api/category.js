const express = require('express');
const router = express.Router();

const {Category} = require('../../models');

router.get('/', (req, res) => {
    Category.findAll({
        order: [['id', 'ASC']]
    })
    .then((categories) => {
        res.status(200).json(categories);
    })
    .catch((err) => {
        res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Category.findById(id)
    .then((category) => {
        if (category) {
            res.status(200).json(category);
        } else {
            res.sendStatus(404);
        }
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    })
});

module.exports = router;