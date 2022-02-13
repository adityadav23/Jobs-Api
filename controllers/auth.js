const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')
const User = require('../models/User')

const register = async (req,res)=>{
    //destructuring req.body
    const {name, email, password} = req.body
    
    //hash salt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //creating temp userObject
    const tempUser = {name, email, password:hashedPassword}
    // upload to db
    const user = await User.create({...tempUser})
    
    res.status(StatusCodes.CREATED).json({user})


}

const login = async (req,res)=>{
    res.send('User logged in ')

}

module.exports = {register,login}
