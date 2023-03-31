const express = require('express');
const router = express.Router();
const {createUser,login,isAdmin} = require('../controllers/userController'); 

router.route('/createuser').post(createUser);
router.route('/login').post(login);
router.route('/isAuthorizedAsAdmin').post(isAdmin);

module.exports = router;