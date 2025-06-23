"use strict";
const { DEFAULT_ERROR } = require("../constants");

/**
 * Custom error class for handling application-specific errors
 * @extends Error
 */
class CustomError extends Error {
    constructor({ errorDescription, errorObject = {}, response = {} }) {
        super(errorDescription);
        this.response = {
            message: response.message,
            statusCode: response.statusCode,
            headers: response.headers,
        };
        console.error(errorDescription, errorObject);
    }
}

/**
 * Global error handler middleware for Express
 * @param {Error|CustomError} error - The error object to handle
 * @param {import('express').Response} res - Express response object
 * @param {import('express').Request} [req] - Express request object
 * @returns {Promise<import('express').Response>} Express response with appropriate error details
 */
const errorHandler = async (error, res, req) => {
    const statusCode = error?.response?.statusCode
        ? error.response.statusCode
        : DEFAULT_ERROR.STATUS_CODE;
    if (error instanceof CustomError) {
        return res.status(statusCode).json({
            message: error?.response?.message
                ? error.response.message
                : DEFAULT_ERROR.MESSAGE,
        });
    } else {
        console.error("[INTERNAL SERVER ERROR] ::: ", error);
        return res.status(statusCode).json({ message: DEFAULT_ERROR.MESSAGE });
    }
};

const responseHandler = async (response, res) => {
    const statusCode = response?.statusCode || 200;
    const message = response?.message || "";
    const data = response?.data || {};
    return res.status(statusCode).json({ data, message });
};

module.exports = {
    CustomError,
    errorHandler,
    responseHandler,
};
