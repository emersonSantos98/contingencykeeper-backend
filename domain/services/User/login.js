const {AppError} = require('../../../error/Errors');
const { userRepository } = require('../../repositories');
const { createAccessToken } = require('../../security');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

module.exports = {
    async login(email, password) {
       return new Promise(async (resolve, reject) => {
           try {
               const user = await userRepository.getByEmail(email);

               if (user === null) {
                   throw new AppError('E-mail ou senha inválidos', StatusCodes.NOT_FOUND);
               }

               const isPasswordValid = await bcrypt.compare(password, user.dataValues.hash_password).catch(error => {
                   throw new AppError(error.message, 500);
               })

                if (!isPasswordValid) {
                    throw new AppError('E-mail ou senha inválidos', StatusCodes.NOT_FOUND);
                }

                delete user.dataValues.hash_password;

               const {accessToken, refreshToken} = await createAccessToken({userUUID: user.dataValues.uuid}).catch(error => {
                   throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
               });


               resolve({
                     accessToken,
                     refreshToken,
                     data: user.dataValues
               });
           } catch (error) {
               reject(error);
           }
       });
    }
}
