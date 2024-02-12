const {create} = require('./create');
const {getById, getAll, getByEmail} = require('./get');
const {login} = require('./login');

module.exports = new class UserService {
    create = create;
    getById = getById;
    getAll = getAll;
    getByEmail = getByEmail;
    login = login;
}
