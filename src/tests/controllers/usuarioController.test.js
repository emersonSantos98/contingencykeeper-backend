
const {UserControllers} = require('../../app/controllers');
const {StatusCodes} = require('http-status-codes');
const yup = require('yup');
describe('Testes para o controlador de usuários', () => {
    it('Deve criar um novo usuário', async () => {
        const req = {
            body: {
                "name": "Emerson",
                "email": "emerson@gmail.com",
                "password": "fdsbddsfbsd"
            }
        };
        let res = {};

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
          await UserControllers.create(req, res);
expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
expect(res.json).toHaveBeenCalledWith(req.body);
    })
    it('Deve retornar erro de validação', async () => {
        const req = {
            body: {
                "name": "Emerson",
                "email": "emersongmail.com",
                "password": "fdsbddsfbsd"
            }
        };
        let res = {};

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
          await UserControllers.createBodyValidation(req, res);
expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
expect(res.json).toHaveBeenCalledWith({errors: [
    {
        message: 'email must be a valid email',
        path: 'email'
    }
]});
    })
})


