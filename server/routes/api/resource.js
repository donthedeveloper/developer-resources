const express = require('express');
const router = express.Router();

const {Resource} = require('../../models');

router.get('/', (req, res) => {
    Resource.findAll({
        order: [['id', 'ASC']]
    })
    .then((resources) => {
        res.status(200).json(resources);
    })
    .catch((err) => {
        res.status(400).send(err);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.resourceId;

    Resource.findById(req.body)
    .then((resource) => {
        if (resource) {
            res.status(200).json(resource);
        } else {
            res.sendStatus(404);
        }
    })
    .catch((err) => {
        res.status(400).send(err);
    });
});

router.post('/', (req, res) => {
    Resource.create(req.body)
    .then((resourceCreated) => {
        res.status(201).json(resourceCreated);
    })
    .catch((err) => {
        res.status(400).send(err);
    });
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name || ''; // TODO: do we need this?
    const description = req.body.description;
    const url = req.body.url || ''; // TODO: do we need this?

    Resource.update({name, description, url}, {
        where: {id},
        fields: Object.keys(req.body)
    })
    .then((updatedCount) => {
        if (updatedCount > 0) {
            console.log('updated count:', updatedCount);
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    })
    .catch((err) => {
        res.status(400).json(err);
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Resource.destroy({
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