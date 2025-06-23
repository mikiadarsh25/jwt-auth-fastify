const ENVIRONMENTS = {
    LOCAL: "local",
    DEVELOPMENT: "development",
    PRODUCTION: "production",
    TEST: "test",
};

const PORT = process.env.PORT || 3000;

const ENVIRONMENT_FILE_PATH = (env) => {
    return `./environments/.env.${env}`;
};

const ERRORS = {
    INVALID_ENVIRONMENT:
        "[ERROR] invalid environment provided, please provide a valid environment in process.env.NODE_ENV",
    ERROR_LOADING_ENVIRONMENT_VARIABLES:
        "[ERROR] in loading environment variables",
    INTERNAL_SERVER_ERROR: "Internal server error",
    USER_NOT_FOUND: "User not found",
    INCORRECT_PASSWORD: "Incorrect Password",
    PERMISSION_DENIED: "Permission denied",
};
const DEFAULT_ERROR = {
    MESSAGE: "Something broke in server, please contact support!",
    STATUS_CODE: 500,
};

const STATUS_CODES = {
    SUCCESS: { GET: 200, PUT: 200, PATCH: 200, POST: 201, DELETE: 204 },
    FAILURE: {
        SERVER_SIDE_ERROR: {
            INTERNAL_SERVER_ERROR: 500,
            SERVICE_UNAVAILABLE: 503,
            GATEWAY_TIMEOUT: 504,
            NOT_IMPLEMENTED: 501,
        },
        CLIENT_SIDE_ERROR: {
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            PAYMENT_REQUIRED: 402,
            FORBIDDEN: 403,
            RESOURCE_NOT_FOUND: 404,
            METHOD_NOT_ALLOWED: 405,
            NOT_ACCEPTABLE: 406,
            PROXY_AUTHENTICATION_REQUIRED: 407,
            REQUEST_TIMEOUT: 408,
            RESOURCE_ALREADY_EXISTS: 409,
            CONFLICT: 409,
            GONE: 410,
            LENGTH_REQUIRED: 411,
            PRECONDITION_FAILED: 412,
            PAYLOAD_TOO_LARGE: 413,
            URI_TOO_LONG: 414,
            UNSUPPORTED_MEDIA_TYPE: 415,
            RANGE_NOT_SATISFIABLE: 416,
            EXPECTATION_FAILED: 417,
            TOO_MANY_REQUESTS: 429,
            UNPROCESSABLE_ENTITY: 422,
        },
    },
};

const SUCCESS_MESSAGES = {
    USER_REGISTERED: "User registered successfully",
    LOGIN_SUCCESS: "User login successfully",
};

module.exports = {
    ENVIRONMENTS,
    PORT,
    ENVIRONMENT_FILE_PATH,
    ERRORS,
    DEFAULT_ERROR,
    STATUS_CODES,
    SUCCESS_MESSAGES,
};
