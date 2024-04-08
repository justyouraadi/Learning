const { StatusCodes } = require("http-status-codes");
const {CityRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data){
    try {
        const city = await cityRepository.create(data)
        return city;
    } catch (error) {
        console.log(error)
         if(error.name == "SequelizeValidationError" || error.name=="SequelizeUniqueConstraintError"){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Connot create a new City object',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createCity
}