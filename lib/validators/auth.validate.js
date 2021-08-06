import Joi from 'joi';  
const loginSchema = Joi.object({
    username: Joi.string().required().min(6),
    password: Joi.string().required(),
    savedLogin: Joi.boolean(),
});

export const loginValidator = (req, res, next) => {
    const {error} = loginSchema.validate(req.body);
    if(error){
        console.error('loi nhe chu');
        console.log(error);
        next(error);
        return;
    }
    next();
};