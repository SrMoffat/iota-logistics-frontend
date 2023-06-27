import { AccountBookOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const formItems = [
    {
        name: "username",
        type: "text",
        rules: [
            {
                type: "string",
                message: "Username is required",
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
                message: "Email is required",
                required: true,
            },
        ],
        placeholder: "someone@example.com",
        icon: MailOutlined,
    },
    {
        name: "password",
        type: "text",
        rules: [
            {
                type: "string",
                message: "Password is required",
                required: true,
            },
        ],
        placeholder: "*********",
        icon: LockOutlined,
    },
];

export {
    formItems
}