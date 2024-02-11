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
      console.log(errors);
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
    createBodyValidation
}
