import * as Joi from 'joiful';

export class EnvVariables {
    @(Joi.string().valid(['development', 'production']).default('development'))
    NODE_ENV: string;

    @(Joi.number().required().default(3000))
    APP_PORT: number;

    @(Joi.string().required())
    REDIS_HOST: string;

    @(Joi.number().required().default(6397))
    REDIS_PORT: number;

    @(Joi.string().required())
    COUNTRIES_BASE_URL: string;


}