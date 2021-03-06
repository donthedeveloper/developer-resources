const express = require('express');
const router = express.Router();

// const userApi = require('./user');
// const loginApi = require('./login');
// const logoutApi = require('./logout');
// const whoAmI = require('./whoami');
const resourceApi = require('./resource');
const categoryApi = require('./category');

// router.use('./user', userApi);
// router.use('./login', loginApi);
// router.use('./logout', logoutApi);
// router.use('./whoami', whoAmIApi);
router.use('/resource', resourceApi);
router.use('/category', categoryApi);

module.exports = router;