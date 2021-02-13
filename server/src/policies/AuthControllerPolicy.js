const Joi = require('joi');

module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$') //regular expression which contains char from a to z, and cap. Z to A, also number from 0 to 9 and it's long at least 8 to 32 char.
            )
        });

        const { error } = schema.validate(req.body);

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    });
                    break;
                case 'password':
                    res.status(400).send({
                        error:
                            'You must provide a valid password which contains char from a to z, and capital letters Z to A, also number from 0 to 9 and its long at least 8 to 32 char'
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'Invalid registation information'
                    });
            }
        } else {
            next();
        }
    }
};
