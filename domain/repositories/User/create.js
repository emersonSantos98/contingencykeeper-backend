const {Usuario} = require('../../models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");

const create = async ({nome, email, hash_senha}) => {
    return  await Usuario.create({
        uuid: 'Us_' + uuidv4(),
        nome,
        email,
        hash_senha
    });
}

module.exports =  {
    create
}
