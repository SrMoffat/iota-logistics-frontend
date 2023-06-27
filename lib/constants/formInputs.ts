import { LockOutlined, AccountBookOutlined } from "@ant-design/icons";

const USERNAME_FIELD = {
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
const EMAIL_FIELD = {
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
const PASSWORD_FIELD = {
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

export default {
    FORM_ITEMS,
    EMAIL_FIELD,
    USERNAME_FIELD,
    PASSWORD_FIELD,
}
