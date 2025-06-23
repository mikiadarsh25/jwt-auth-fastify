"use strict";
const fastify = require("fastify")({ logger: true });
const { PORT } = require("./constants");
const { ERRORS } = require("./constants");
const routes = require("./routes");
require("./environments/environment").setupEnvironment();
require("./models/server");

// Register CORS plugin
fastify.register(require("@fastify/cors"));

// Register Helmet plugin for security headers
fastify.register(require("@fastify/helmet"));

// Health check route
fastify.get("/health", async (request, reply) => {
    return reply.status(200).send("Server is healthy");
});

// Register your routes
fastify.register(routes);

// 404 handler (optional - uncomment if needed)
fastify.setNotFoundHandler(async (request, reply) => {
    return reply.status(404).send({
        message: `Can't find ${request.url} on this service!`,
    });
});

// Global error handler
fastify.setErrorHandler(async (error, request, reply) => {
    fastify.log.error(error);

    const statusCode = error.statusCode || 500;
    const message = error.message || ERRORS.INTERNAL_SERVER_ERROR;

    return reply.status(statusCode).send({
        statusCode: statusCode,
        message: message,
    });
});

// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: PORT, host: "0.0.0.0" });
        console.log(`Fastify server listening on port ${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
