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

router.post('/', (req, res) => {
    const name = req.body.name;

    Category.create(req.body)
    .then((category) => {
        res.status(201).json(category);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;

    Category.update(req.body, {
        where: {id},
        fields: Object.keys(req.body)
    })
    .then((updatedCount) => {
        if (updatedCount > 0) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: {id}
    })
    .then((deletedCount) => {
        if (deletedCount > 0) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

module.exports = router;