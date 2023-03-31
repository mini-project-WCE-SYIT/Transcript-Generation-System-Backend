const {StatusCodes} = require('http-status-codes');
const catchAsync = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next)
      } catch (err) {
        let customError = {
          statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
          msg: err.message || 'Something went wrong try again later',
        }
        return res.status(customError.statusCode).json({ msg: customError.msg })
      }
    }
  }
  
  module.exports = catchAsync
  