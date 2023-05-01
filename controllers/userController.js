const User = require('../models/User');
const {promisify} = require('util')
const customError = require('../errors')
const {StatusCodes}  = require('http-status-codes');
const catchAsync = require('../middlewares/catchAsync');
const jwt = require('jsonwebtoken');

const CreateToken = id => {
    let token = jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "1d"
    });
    return token;
}

const SendToken = (user,StatusCode, res) => {
    const token = CreateToken(user._id);
    let cookieOptions = {
        expires: new Date(Date.now() + 400*1*60*60),
        httpOnly: true
    }
    res.cookie('token', token,cookieOptions);
    res.status(StatusCode).json({
        status:"Success",
        token,
        data:{
            user,
            role:user.role
        }
    })
}

const createUser = catchAsync(async(req,res,next)=>{
    const {username,password,role} = req.body;
    if(!username || !password){
      throw new customError.BadRequestError('Please provide the credentials');
    }
    if(!role) role = "user";
    const user = await User.create({username,password,role});
    SendToken(user,201,res);
})

const login = catchAsync(async(req,res) => {
    const {username,password} = req.body;

    if(!username || !password){
        throw new customError.BadRequestError('Please provide the credentials');
    }
    const user = await User.findOne({ username });
    if(!user){
        throw new customError.NotFoundError(`No user with id ${username}`);
    }
    else if(!(user.password === password)){
        res.status(400).json({msg : 'Incorrect username or password'});
    }
    else{
        SendToken(user,200,res);
    }

});


const isAdmin = catchAsync(async(req,res,next)=>{
    const {username} =  req.body;
    const user = await User.findOne({username});
    if(!user){
        return next(
          new customError.NotFoundError('User not found')
        )
    }
    else{
        res.status(200).json({"role":user.role});
    }
});
module.exports = {createUser,login,isAdmin};