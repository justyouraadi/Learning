const { StatusCodes } = require("http-status-codes");
const {AirportRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        const airport = await airportRepository.create(data)
        return airport;
    } catch (error) {
        if(error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Connot create a new Airport object',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirports(){
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        console.log(error)
        throw new AppError('Connot fetch data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested is not present',error.StatusCode)
        }
        throw new AppError('Connot fetch data of the airport',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function destroyAirport(id){
    try{
        const airport = await airportRepository.destroy(id);
        return airport;
    }catch(error){
        if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested is not present',error.StatusCode)
        }
        throw new AppError('Connot fetch data of the airport',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports={
    createAirport,
    getAirports,
    getAirport,
    destroyAirport
}