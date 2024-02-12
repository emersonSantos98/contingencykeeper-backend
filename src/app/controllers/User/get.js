const {StatusCodes} = require('http-status-codes');

const {UserService} = require('../../../../domain/services');


module.exports = {
    async getAll(req, res) {
        const users = await UserService.getAll(req.query);
        return res.status(StatusCodes.OK).json(users);
    },

    async getById(req, res) {
        const {uuid} = req.params;
        const user = await UserService.getById(uuid);
        return res.status(StatusCodes.OK).json(user);
    },

}
