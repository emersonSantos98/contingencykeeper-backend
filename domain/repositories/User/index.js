const {create} = require('./create');

module.exports = new class UserRepositories {
    create = create;
}
