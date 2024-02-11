const { create, createBodyValidation } = require('./create');


module.exports = new class UserControllers {
    create =  create;
    createBodyValidation = createBodyValidation;
}
