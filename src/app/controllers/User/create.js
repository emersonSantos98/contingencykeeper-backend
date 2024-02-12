const {StatusCodes} = require('http-status-codes');
const yup = require('yup');

const {UserService } = require('../../../../domain/services');




const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

 const createBodyValidation = async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
          const errors = error.inner.map((err) => ({
                message: err.message,
                path: err.path,
            }));
            return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
}


const schemaEmail = yup.object().shape({
    email: yup.string().email().required(),
});

 const userExists = async (req, res, next) => {
    try {
        const { email } = req.body;
         await schemaEmail.validate({ email }, { abortEarly: false });
        const user = await UserService.getByEmail(email);

        if (user !== null) {
            return res.status(StatusCodes.BAD_REQUEST).json({error: 'Usuário já existe!'});
        }
        next();
    } catch (error) {
        const errors = error.inner.map((err) => ({
            message: err.message,
            path: err.path,
        }));
        return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
 }


 const create = async (req, res) => {
     const { name, email, password } = req.body;
     const user = await UserService.create({ name, email, password });
     return res.status(StatusCodes.CREATED).json(user);
 }

module.exports = {
    create,
    createBodyValidation,
    userExists
}
