const Joi = require("joi");
const { ENVIRONMENTS, ERRORS, ENVIRONMENT_FILE_PATH } = require("../constants");

// Defining the schema for the environment variables
// to maintain consistency across different environment files.
const environmentFileSchema = Joi.object({
    EXPRESS_SERVER_PORT: Joi.number().integer().required(),
    MONGO_URI: Joi.string().required(),
    NODE_ENV: Joi.string().required(),
    JWT_SECRET_KEY: Joi.string().required(),
}).unknown(true);

// Loading environment variables.
const loadEnvironmentVariables = () => {
    require("dotenv").config({
        path: ENVIRONMENT_FILE_PATH(process.env.NODE_ENV),
    });
};

// Validate environment variables against the environmentFileSchema.
const validateEnvironmentVariables = () => {
    const { error } = environmentFileSchema.validate(process.env);
    if (error) {
        throw new Error(error);
    }
};

// Load environment variables based on the value of the `process.env.NODE_ENV` variable.
const setupEnvironment = () => {
    try {
        const environments = Object.values(ENVIRONMENTS);
        if (!environments.includes(process.env.NODE_ENV)) {
            throw new Error(ERRORS.INVALID_ENVIRONMENT);
        }
        if (process.env.NODE_ENV === ENVIRONMENTS.LOCAL) {
            loadEnvironmentVariables();
        }
        validateEnvironmentVariables();
    } catch (error) {
        console.error(
            `${ERRORS.ERROR_LOADING_ENVIRONMENT_VARIABLES} ::: `,
            error
        );
        // Exiting the process if environment variables are not loaded properly.
        process.exit(1);
    }
};

module.exports = {
    setupEnvironment,
    loadEnvironmentVariables,
    validateEnvironmentVariables,
};
