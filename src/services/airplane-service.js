const { StatusCodes } = require("http-status-codes");
const {AirplaneRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data)
        return airplane;
    } catch (error) {
        if(error.name == "TypeError"){
            throw new AppError('Connot create a new Airplane object',StatusCodes.INTERNAL_SERVER_ERROR)
        } else if(error.name == "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST)
        }
        throw error;
    }
}

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Connot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present',error.StatusCode)
        }
        throw new AppError('Connot fetch data of the airplane',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function destroyAirplane(id){
    try{
        const airplane = await airplaneRepository.destroy(id);
        return airplane;
    }catch(error){
        if(error.StatusCode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present',error.StatusCode)
        }
        throw new AppError('Connot fetch data of the airplane',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}