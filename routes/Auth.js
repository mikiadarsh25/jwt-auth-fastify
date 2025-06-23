const service = require("../services");
const { errorHandler, responseHandler } = require("../libs/responseHandler");
const { SUCCESS_MESSAGES, STATUS_CODES } = require("../constants");
const validateInputFields = require("../middlewares/inputValidator");

async function authRoutes(fastify, options) {
    // Register route
    fastify.post("/register", async (request, reply) => {
        try {
            const {
                params,
                body: { userName, password },
            } = request;

            await service.registerUser({ userName, password });

            const response = {
                message: SUCCESS_MESSAGES.USER_REGISTERED,
                statusCode: STATUS_CODES.SUCCESS.POST,
                data: {},
            };

            await responseHandler(response, reply);
        } catch (error) {
            console.log(error);
            await errorHandler(error, request, reply);
        }
    });

    // Login route
    fastify.post("/login", async (request, reply) => {
        try {
            const {
                params,
                body: { userName, password },
            } = request;

            const token = await service.getRegisteredUser({
                userName,
                password,
            });

            const response = {
                data: { token },
                statusCode: STATUS_CODES.SUCCESS.POST,
                message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
            };

            await responseHandler(response, reply);
        } catch (error) {
            console.log(error);
            await errorHandler(error, request, reply);
        }
    });
}

module.exports = authRoutes;
