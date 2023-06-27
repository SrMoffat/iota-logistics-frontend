export default {
    400: {
        name: "BadRequest",
        message: "Malformed request received."
    },
    401: {
        name: "Unauthorized",
        message: "Please login to perform this action."
    },
    403: {
        name: "Forbidden",
        message: "You do not have required permissions for this action."
    },
    404: {
        name: "NotFound",
        message: "Requested resource was not found."
    },
    405: {
        name: "MethodNotAllowed",
        message: "Method not allowed"
    },
    422: {
        name: "UnprocessableEntity",
        message: "You have provided a malformed request."
    },
    429: {
        name: "TooManyRequests",
        message: "Your requests are being blocked due to high traffic."
    },
    500: {
        name: "InternalServerError",
        message: "Server downtime. Please hold as we sort it out."
    },
    503: {
        name: "ServiceUnavailable",
        message: "Sever is currently down. Please try again later."
    }
}