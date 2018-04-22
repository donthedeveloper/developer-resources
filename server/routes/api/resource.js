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

    Resource.findById(id)
        .then((resource) => {
            res.status(200).json(resource);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;

    Resource.create({name, description, url})
        .then((resourceCreated) => {
            res.status(201).json(resourceCreated);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;

    Resource.update({name, description, url}, {
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
            res.status(400).send(err);
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Resource.destroy({where: {id}})
        .then((deletedCount) => {
            if (deletedCount > 0) {
                res.sendStatus(204)
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

module.exports = router;