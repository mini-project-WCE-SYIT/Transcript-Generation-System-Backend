const express = require('express')
const router = express.Router()
const {
  createTranscript,
  uploadSettings,
  uploadFile,
  getAllApplicants,
  createMasterSheet,
  mastersheetSettings,
  getMasterSheet,
  getReportDetails,
} = require('../controllers/applicantController')
router.route('/createtranscript').post(createTranscript)
router.route('/upload').post(uploadSettings, uploadFile)
router
  .route('/mastersheet')
  .post(mastersheetSettings, createMasterSheet)
  .get(getMasterSheet)
router.route('/getallapplications').get(getAllApplicants)
router.route('/getreports/:_id').get(getReportDetails)

module.exports = router
