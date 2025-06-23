"use strict";
const validateInputFields = (schemas) => {
    return (req, res, next) => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        const sources = ["body", "query", "params"];
        const allErrors = [];

        // Use req.route.path to get the route pattern
        const routePath = req.route?.path;
        const method = req.method;

        if (!routePath || !schemas?.[routePath]?.[method]) {
            return next();
        }

        const methodSchemas = schemas[routePath][method];

        for (const source of sources) {
            if (methodSchemas[source]) {
                const { error, value } = methodSchemas[source].validate(
                    req[source],
                    validationOptions
                );

                if (error) {
                    const formattedErrors = error.details.map((detail) => ({
                        message: detail.message,
                        path: detail.path.join("."),
                    }));
                    allErrors.push(...formattedErrors);
                } else {
                    req[source] = value; // sanitized data
                }
            }
        }

        if (allErrors.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                errors: allErrors,
            });
        }

        next();
    };
};

module.exports = validateInputFields;
