const {create} = require('./create');
const {getAll, getById, getByEmail} = require('./get');

module.exports = new class UserRepositories {
    create = create;
    getAll = getAll;
    getById = getById;
    getByEmail = getByEmail;
}
