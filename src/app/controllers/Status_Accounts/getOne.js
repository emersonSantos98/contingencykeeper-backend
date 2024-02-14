const {StatusCodes} = require('http-status-codes');

const {StatusAccountService} = require('../../../../domain/services');


module.exports = {
    async getOne(req, res) {
        const StatusAccount = await StatusAccountService.getOne(req.query);
        return res.status(StatusCodes.OK).json(StatusAccount);
    },
}
