const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req,res)=>{

    // upload to db
    const user = await User.create({...req.body})
    //generating token
    const token = user.createJWT() 
    res.status(StatusCodes.CREATED).json({user:{name:user.name}, token})


}
const login = async (req, res) => {
    const { email, password } = req.body
  //validating email and password provided
    if (!email || !password) {
      throw new BadRequestError('Please provide email and password')
    }
    //find user in db
    const user = await User.findOne({ email })
    //if user doesn't exist
    if (!user) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    //check if password is correct
    const isPasswordCorrect = await user.comparePassword(password)
    //if password incorrect
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials')
    }
    //create jwt token using instance method after successful authentication
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
  }

module.exports = {register,login}
