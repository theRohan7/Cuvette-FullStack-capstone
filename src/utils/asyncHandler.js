const asyncHandler = (funct) => async(req, res, next) =>{
    try {
        await funct(req, res, next)
    } catch (error) {
        res.status(500 ).json({
            success: false,
            message:  error.message
        })
    }

}

export {asyncHandler}