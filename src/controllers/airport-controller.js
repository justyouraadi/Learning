const {StatusCodes} = require("http-status-codes");
const {AirportService} = require("../services")
const {SuccessResponse,ErrorResponse} = require("../utils/common")

/**
 * 
 * POST : /airports
 * req-body : {name:'IGI',cityId:5,code:'DEL'}
 */

async function createAirport(req,res){
    try {
        const airport = await AirportService.createAirport({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId
        })
        SuccessResponse.message = "Successfully create an airport";
        SuccessResponse.data=airport;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Something went wrong while creating airport"
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

/**
 * 
 * GET : /airports
 */

async function getAirports(req,res){
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
        return res 
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}


/**
 * 
 * POST : /airport/:id
 */

async function getAirport(req,res){
    try {
        console.log("in controller ",req.params.id)
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
        return res 
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

/**
 * 
 * DELETE : /airport/:id
 */

async function destroyAirport(req,res){
    try {
        const airport = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = airport;
        return res 
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}



module.exports={
    createAirport,
    getAirports,
    getAirport,
    destroyAirport
}