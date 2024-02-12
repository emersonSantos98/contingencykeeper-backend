const {create} = require('./create');
const {getById, getAll, getByEmail} = require('./get');

module.exports = new class UserService {
    create = create;
    getById = getById;
    getAll = getAll;
    getByEmail = getByEmail;
}
