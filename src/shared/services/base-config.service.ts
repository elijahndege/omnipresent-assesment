import * as dotenv from 'dotenv';
import * as Joi from 'joiful';
import { IEnvConfig } from '../../common/interfaces/env-config';
import { Injectable } from '@nestjs/common';
import { EnvVariables } from './env-variables';
@Injectable()
export class BaseConfigService {
    constructor() { }
    getEnvs() {
        try {
            const nodeEnv = process.env.NODE_ENV || 'development';
            return dotenv.config({ path: `${nodeEnv}.env` }).parsed;
        } catch (error) {
            throw new Error(`[getEnvs] Unable to parse .env: ${error}`);
        }
    }

    validateInput(environmentConfig: IEnvConfig): IEnvConfig {
        const { error, value: validatedEnvs } = Joi.validateAsClass(
            environmentConfig,
            EnvVariables,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvs;

    }

}