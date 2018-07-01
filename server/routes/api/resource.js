const express = require('express');
const router = express.Router();

const {Category, Resource} = require('../../models');

router.get('/', (req, res) => {
    const categoryName = req.query.category;

    // const 

    let options = {
        order: [['id', 'ASC']]
    };
    options.where = categoryName ? {categoryName} : null;

    // TODO: get all resources (with category id) when we have category id, so create those relationships

    Resource.findAll(options)
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

    Resource.update(req.body, {
        where: {id}
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