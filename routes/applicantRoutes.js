const express = require('express')
const router = express.Router()
const {
  createTranscript,
  uploadSettings,
  uploadFile,
  getAllApplicants,
  createMasterSheet,
  mastersheetSettings,
  getMasterSheet
} = require('../controllers/applicantController')
router.route('/createtranscript').post(createTranscript)
router.route('/upload').post(uploadSettings, uploadFile)
router.route('/mastersheet').post(mastersheetSettings, createMasterSheet).get(getMasterSheet)
router.route('/getallapplications').get(getAllApplicants)

module.exports = router
