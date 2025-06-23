"use strict";
const jwt = require("jsonwebtoken");
const { ERRORS, STATUS_CODES } = require("../constants");
const { CustomError } = require("../libs/responseHandler");

const verifyToken = async (req, res, next) => {
    const token = req.headers("Authorization");
    if (!token) {
        throw new CustomError({
            errorDescription: ERRORS.PERMISSION_DENIED,
            errorObject: {},
            response: {
                message: ERRORS.PERMISSION_DENIED,
                statusCode: STATUS_CODES.FAILURE.CLIENT_SIDE_ERROR.UNAUTHORIZED,
            },
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch {
        throw new CustomError({
            errorDescription: ERRORS.PERMISSION_DENIED,
            errorObject: {},
            response: {
                message: ERRORS.PERMISSION_DENIED,
                statusCode: STATUS_CODES.FAILURE.CLIENT_SIDE_ERROR.UNAUTHORIZED,
            },
        });
    }
};

module.exports = verifyToken;
