const {User} = require('../../models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");

const create = async ({name, email, hash_password}) => {
    return  await User.create({
        uuid: 'Us_' + uuidv4(),
        name,
        email,
        hash_password
    });
}

module.exports =  {
    create
}
