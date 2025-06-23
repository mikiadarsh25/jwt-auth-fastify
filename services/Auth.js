"use strict";
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { CustomError } = require("../libs/responseHandler");
const { ERRORS, STATUS_CODES } = require("../constants");

const registerUser = async ({ userName, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        userName,
        password: hashedPassword,
        createdOn: new Date(),
    });
    return await user.save();
};

const getRegisteredUser = async ({ userName, password }) => {
    const user = await User.findOne({ userName });
    console.log(user);
    if (!user) {
        throw new CustomError({
            errorDescription: ERRORS.USER_NOT_FOUND,
            errorObject: {},
            response: {
                message: ERRORS.USER_NOT_FOUND,
                statusCode:
                    STATUS_CODES.FAILURE.CLIENT_SIDE_ERROR.RESOURCE_NOT_FOUND,
            },
        });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new CustomError({
            errorDescription: ERRORS.INCORRECT_PASSWORD,
            errorObject: {},
            response: {
                message: ERRORS.INCORRECT_PASSWORD,
                statusCode: STATUS_CODES.FAILURE.CLIENT_SIDE_ERROR.BAD_REQUEST,
            },
        });
    }

    const token = jwt.sign(
        { email: user.userName },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1h",
        }
    );
    return token;
};

module.exports = { registerUser, getRegisteredUser };
