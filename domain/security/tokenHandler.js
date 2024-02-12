const jwtConfig = require('../../config/jwtConfig');
const jwt = require('jsonwebtoken');
const {AppError} = require('../../error/Errors');
const secretKey = jwtConfig.jwtConfig.secret;
const refreshSecretKey = jwtConfig.jwtConfig.refreshTokenSecret;
const expiresIn = jwtConfig.jwtConfig.expiresIn;
const refreshExpiresIn = jwtConfig.jwtConfig.refreshTokenExpiresIn;



module.exports = {
    createAccessToken: async (payload) => {
        return new Promise((resolve, reject) => {
            try {
                const accessToken = jwt.sign(payload, secretKey, {
                    algorithm: 'HS256',
                    expiresIn: expiresIn
                });
                const refreshToken = jwt.sign(payload, refreshSecretKey, {
                    algorithm: 'HS256',
                    expiresIn: refreshExpiresIn
                });
                resolve({accessToken, refreshToken});
            } catch (error) {
                reject(new AppError('Error generating token', 500));
            }
        });
    },

    createRefreshToken: async (payload) => {
        return new Promise((resolve, reject) => {
            try {
                jwt.verify(payload, refreshSecretKey);
                const decoded = jwt.decode(payload);
                const newPayload = {
                    id: decoded.id,
                    email: decoded.email,
                }
                const accessToken = jwt.sign(newPayload, secretKey, { expiresIn: expiresIn, algorithm: 'HS256' });
                const newRefreshToken = jwt.sign(newPayload, refreshSecretKey, { expiresIn: refreshExpiresIn, algorithm: 'HS256' });
                resolve({accessToken, refreshToken: newRefreshToken});
            } catch (error) {
                reject(new AppError('Invalid refresh token', 401));
            }
        });
    }
}


