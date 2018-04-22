const express = require('express');
const router = express.Router();

const {Resource} = require('../../models');

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;

    Resource.create({name, description, url})
        .then((resourceCreated) => {
            res.json(resourceCreated);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;