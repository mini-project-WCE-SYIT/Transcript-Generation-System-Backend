const express = require('express');
const router = express.Router();
const {createTranscript,uploadSettings, uploadFile,getAllApplicants} = require('../controllers/applicantController');
router.route('/createtranscript').post(createTranscript);
router.route('/upload').post(uploadSettings,uploadFile);
router.route('/getallapplications').get(getAllApplicants);

module.exports = router;