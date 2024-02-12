const { create, createBodyValidation, userExists } = require('./create');
const { getAll, getById} = require('./get');

module.exports = new class UserControllers {
    create =  create;
    createBodyValidation = createBodyValidation;
    userExists = userExists;
    getAll = getAll;
    getById = getById;
}
