const { userRepository } = require('../../repositories');
const { hashPassword, } = require('../../../helpers');


module.exports = {
    async create(user) {
        user.password = await hashPassword(user.password);
        return userRepository.create({...user, hash_password: user.password});
    }
}



