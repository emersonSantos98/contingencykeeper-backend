const { create, createBodyValidation, userExists } = require('./create');
const { getAll, getById} = require('./get');
const {login, loginBodyValidation } = require('./login');

module.exports = new class UserControllers {
    create =  create;
    createBodyValidation = createBodyValidation;
    userExists = userExists;
    getAll = getAll;
    getById = getById;
    login = login;
    loginBodyValidation = loginBodyValidation;
}
