const {authenticateToken, verifyRefreshToken} = require('./middlewares/MiddlewaresAuth');
const {createAccessToken, createRefreshToken} = require('./tokenHandler');


module.exports = new class Security {

    createAccessToken = createAccessToken;
     createRefreshToken = createRefreshToken;
    authenticateToken = authenticateToken;
    verifyRefreshToken = verifyRefreshToken;
}
