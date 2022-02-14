const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req,res)=>{
    const jobs = await Job.find({
        ceatedBy: req.user.userId
    }).sort('createdAt')

    res.status(StatusCodes.OK).json({nBHits: jobs.length, jobs})
}

const getJob = async (req,res)=>{
    res.send('get a job ')

}

const createJob = async (req,res)=>{

    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)

    res.status(StatusCodes.CREATED).json({job})

}

const updateJob = async (req,res)=>{
    res.send('Job updated')

}
const deleteJob = async (req,res)=>{
    res.send('Job deleted')
}

module.exports = {getAllJobs,
                    getJob,
                    createJob,
                    updateJob,
                    deleteJob,
}