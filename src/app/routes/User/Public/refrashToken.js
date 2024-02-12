const router = require('express').Router();
const {UserControllers} = require('../../../controllers');
const {verifyRefreshToken} = require('../../../../../domain/security');


router.post('/refrashToken',
    UserControllers.refreshToken
);


router.post('/verifyRefrashToken', verifyRefreshToken, (req, res) => {
    res.status(200).json({ msg: "Token válido!" });
}
);

module.exports = router;
