import { AccountBookOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const HTTP_ERRORS = {
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

const API_BASE_URL = "http://localhost:1337/api";

const FORM_ITEMS = [
    {
        name: "username",
        type: "text",
        rules: [
            {
                type: "string",
                message: "Username is a required field",
                required: true,
            },
        ],
        placeholder: "Jane Doe",
        icon: AccountBookOutlined,
    },
    {
        name: "email",
        type: "text",
        rules: [
            {
                type: "email",
                message: "Email is a required field",
                required: true,
            },
        ],
        placeholder: "someone@example.com",
        icon: MailOutlined,
    },
    {
        name: "password",
        type: "password",
        rules: [
            {
                type: "string",
                message: "Password is a required field",
                required: true,
            },
        ],
        placeholder: "*********",
        icon: LockOutlined,
    },
];

const FORM_PARENT_STYLES = {
    border: "0.1px solid rgba(0,0,0,0.1)",
    borderRadius: 15,
    backgroundColor: "white",
    overflow: "hidden",
};

export {
    FORM_ITEMS,
    API_BASE_URL,
    HTTP_ERRORS,
    FORM_PARENT_STYLES
}