const {StatusCodes} = require('http-status-codes');

const {StatusAccountService} = require('../../../../domain/services');


module.exports = {
    async getAll(req, res) {
        const StatusAccount = await StatusAccountService.getAll(req.query);
        return res.status(StatusCodes.OK).json(StatusAccount);
    },
}
