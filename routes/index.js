const Auth = require("./Auth");
const verifyToken = require("../middlewares/authMiddleware");

// Export a plugin function, not a fastify instance
async function routes(fastify, options) {
    // Register the Auth routes under /Auth prefix
    await fastify.register(Auth, { prefix: "/Auth" });
}

module.exports = routes;
