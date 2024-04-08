const {StatusCodes} = require("http-status-codes");
const {CityService} = require("../services")
const {SuccessResponse,ErrorResponse} = require("../utils/common")

/**
 * 
 * POST : /cities
 * req-body : {name: 'Lodon'}
 */

async function createCity(req,res){
    try {
        const city = await CityService.createCity({
            name:req.body.name
        })
        SuccessResponse.message = "Successfully create an city";
        SuccessResponse.data=city;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong while creating city"
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

module.exports={
    createCity
}