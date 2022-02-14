const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllJobs = async (req,res)=>{
    const jobs = await Job.find({
        createdBy: req.user.userId
    }).sort('createdAt')

    res.status(StatusCodes.OK).json({nBHits: jobs.length, jobs})
}

const getJob = async (req,res)=>{
    const { user:{userId},params:{id:jobId} } = req

    const job = await Job.findOne({
        _id:jobId,
        createdBy:userId
    })
    //if job not found by that user
    if(!job){
        throw new NotFoundError(`Job not found with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})

}

const createJob = async (req,res)=>{

    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)

    res.status(StatusCodes.CREATED).json({job})

}

const updateJob = async (req,res)=>{
    //destructuring req
    const {
        body:{company, position},
        user:{userId},
        params:{id:jobId}
    } = req
        //validate if company and position
        if( company === '' || position === ''){
            throw new BadRequestError(`Company and Position can't be left empty`)
        }
    const job = await Job.findByIdAndUpdate(
        {_id:jobId, createdBy: userId},
        req.body,
        {new:true, runValidators:true},
        )
      //if job not found by that user
    if(!job){
        throw new NotFoundError(`Job not found with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
    
    }
const deleteJob = async (req,res)=>{
    const { user:{userId},params:{id:jobId} } = req

    const job = await Job.findByIdAndDelete({
        _id:jobId,
        createdBy:userId
    })
    //if job not found by that user
    if(!job){
        throw new NotFoundError(`Job not found with id ${jobId}`)
    }

    res.status(StatusCodes.OK).send()

}

module.exports = {getAllJobs,
                    getJob,
                    createJob,
                    updateJob,
                    deleteJob,
}