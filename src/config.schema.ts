import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(8082).required(),
  NODE_ENV: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRY_TIME: Joi.string().required(),
  TWO_FACTOR_AUTHENTICATION_APP_NAME: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
  AWS_ACCESS_KEY: Joi.string().required(),
  AWS_SECRET_KEY: Joi.string().required(),
  AWS_BUCKET: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_URL: Joi.string().required(),
  BITQUERY_API_KEY: Joi.string().required(),
  CRYPTO_COMPARE_API_KEY: Joi.string().required(),
  BLOCKCYPHER_TOKEN: Joi.string().required(),
  BLOCKCYPHER_HOOK_URL_BTC: Joi.string().required(),
  BLOCKCYPHER_HOOK_URL_ETH: Joi.string().required(),
  BSC_EXPLORER: Joi.string().required(),
  ETH_EXPLORER: Joi.string().required(),
  MORALIS_API_KEY: Joi.string().required(),
  MORALIS_CALLBACK_URL: Joi.string().required(),
});
