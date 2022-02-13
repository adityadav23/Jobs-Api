const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')
const User = require('../models/User')

const register = async (req,res)=>{

    // upload to db
    const user = await User.create({...req.body})

    res.status(StatusCodes.CREATED).json({user})


}

const login = async (req,res)=>{
    res.send('User logged in ')

}

module.exports = {register,login}
