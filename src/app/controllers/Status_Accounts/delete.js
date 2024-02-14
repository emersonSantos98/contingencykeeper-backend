const {StatusCodes} = require('http-status-codes');

const {StatusAccountService} = require('../../../../domain/services');


module.exports = {
    async delete(req, res) {
        const { uuid } = req.params;
        const StatusAccount = await StatusAccountService.delete(uuid);
        return res.status(StatusCodes.OK).json(StatusAccount);
    },
}
