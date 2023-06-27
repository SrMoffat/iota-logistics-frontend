import { AccountBookOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

export const USER_STORAGE_KEY = 'iota-user'

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

const USERNAME_FIELD =  {
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
}
const EMAIL_FIELD =  {
    name: "email",
    type: "email",
    rules: [
        {
            type: "string",
            message: "Email is a required field",
            required: true,
        },
    ],
    placeholder: "jane@doe.com",
    icon: AccountBookOutlined,
}
const PASSWORD_FIELD =  {
    name: "password",
    type: "password",
    rules: [
        {
            type: "string",
            message: "Password is a required field",
            required: true,
        },
    ],
    placeholder: "***************",
    icon: LockOutlined,
}

const FORM_ITEMS = [
    USERNAME_FIELD,
    EMAIL_FIELD,
    PASSWORD_FIELD,
];

const FORM_PARENT_STYLES = {
    border: "0.1px solid rgba(0,0,0,0.1)",
    borderRadius: 15,
    backgroundColor: "white",
    overflow: "hidden",
};

export {
    FORM_ITEMS,
    HTTP_ERRORS,
    EMAIL_FIELD,
    API_BASE_URL,
    USERNAME_FIELD,
    PASSWORD_FIELD,
    FORM_PARENT_STYLES
}