const {create} = require('./create');
const {getById, getAll, getByEmail} = require('./get');
const {login, refreshToken} = require('./login');

module.exports = new class UserService {
    create = create;
    getById = getById;
    getAll = getAll;
    getByEmail = getByEmail;
    login = login;
    refreshToken = refreshToken;
}
