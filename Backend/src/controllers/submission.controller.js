import { db } from "../libs/db.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"

const getUserSubmissionsForProblem = async (req,res) => {
    try {
        const userId = req.user.id
        const problemId = req.params.problemId

        const submissions = await db.submission.findMany({
            where :{
                userId:userId,
                problemId:problemId
            }
        })

        res.status(200).json(new ApiResponse(200,"All submissions fetched successfully for user",submissions))
    } catch (error) {
        res.status(500).json(new ApiError(500,"Failed to fetch user's submissions for this problem"))
    }
}

const getAllSubmissions = async (req,res) => {
    try {
        const userId = req.user.id

        const submissions = await db.submission.findMany({
            where :{
                userId:userId
            }
        })
        
        res.status(200).json(new ApiResponse(200,"All submissions fetched successfully",submissions))
    } catch (error) {
        res.status(500).json(new ApiError(500,"Failed to fetch all submissions"))
    }
}

const getAllSubmissionsForProblem = async (req,res) => {
    try {
        const problemId = req.params.problemId

        const submissions = await db.submission.count({
            where :{
                problemId:problemId
            }
        })

        res.status(200).json(new ApiResponse(200,"All submissions count fetched successfully",submissions))
    } catch (error) {
        res.status(500).json(new ApiError(500,"Failed to fetch count of submissions for this problem"))
    }
}

export {getUserSubmissionsForProblem,getAllSubmissions,getAllSubmissionsForProblem}