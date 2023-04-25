const express = require('express')
const router = express.Router()
const {
  createTranscript,
  uploadSettings,
  uploadFile,
  getAllApplicants,
  createMasterSheet,
  mastersheetSettings,
} = require('../controllers/applicantController')
router.route('/createtranscript').post(createTranscript)
router.route('/upload').post(uploadSettings, uploadFile)
router.route('/mastersheet').post(mastersheetSettings, createMasterSheet)
router.route('/getallapplications').get(getAllApplicants)

module.exports = router
