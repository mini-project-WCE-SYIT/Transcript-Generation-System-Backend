const Applicant = require('../models/Applicant')
const { StatusCodes } = require('http-status-codes')
const customError = require('../errors')
const catchAsync = require('../middlewares/catchAsync')
const path = require('path');
const { convertExcelToJson } = require('../utils/excelToJson');

//multer
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    console.log(file)
    const ext = file.mimetype.split('/')[1]
    cb(null, `user-${Date.now()}-${Date.now()}.${ext}`)
  },
})
const masterStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/mastersheet')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, `mastersheet.xlsx`)
  },
})

const upload = multer({
  storage: multerStorage,
})
const uploadMaster = multer({
  storage: masterStorage,
})

const uploadSettings = upload.single('image')
const mastersheetSettings = uploadMaster.single('mastersheet')

const createTranscript = catchAsync(async (req, res) => {
  // const {
  //     firstName,
  //     lastName,
  //     prn,
  //     branch,
  //     yos,
  //     contactNo,
  //     copies,
  //     address,
  //     marksheet,
  //     yesOrignals,
  // } = req.body;
  // const fees = copies*700;
  console.log(req.body);
  const applicant = await Applicant.create(req.body)
  res.status(StatusCodes.CREATED).json({ applicant })
})

const uploadFile = catchAsync(async (req, res) => {
  const file = req.file
  if (!file) {
    throw new customError.BadRequestError('Please provide a image')
  }
  const name = req.body.name
  const yearSem = req.body.yearSem
  const applicant = await Applicant.findOne({ name })
  if (!applicant) {
    throw new customError.BadRequestError('Please provide a name')
  }
  imageURL = `http://localhost:5000/static/${file.filename}`
  applicant.ReportDetails.push({ imageURL, yearSem })
  await applicant.save()
  res.status(StatusCodes.CREATED).json({ applicant })
})

const getAllApplicants = catchAsync(async (req, res) => {
  const applicants = await Applicant.find({})
  res.status(StatusCodes.OK).json({ applicants })
})

const createMasterSheet = catchAsync(async (req, res) => {
  const file = req.file
  if (!file) {
    throw new customError.BadRequestError('Please provide a image')
  }
  const data = convertExcelToJson();
  htmlToPdf();
  res.status(StatusCodes.CREATED).json({ msg: 'Added mastersheet', data })
})

const getMasterSheet = catchAsync(async (req,res) => {
  res.setHeader('Content-Type', 'application/pdf');
  const filePath = path.join(__dirname,"..","uploads","Transcript","Transcript.pdf");
  res.status(200).sendFile(filePath);
})

module.exports = {
  createTranscript,
  uploadSettings,
  uploadFile,
  getAllApplicants,
  createMasterSheet,
  mastersheetSettings,
  getMasterSheet
}
