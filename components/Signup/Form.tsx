import { AccountBookOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Row, Col, Divider, Input } from 'antd';

import { signupUser } from '../../lib/users';

import LoginSection from './Login';
import Footer from './Footer';

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
        icon: <AccountBookOutlined />,
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
        icon: <MailOutlined />,
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
        icon: <LockOutlined />,
    },
];

const FormFields = (props) => {
    const { formItems } = props;
    return formItems.map(entry => {
        const { name, rules, placeholder, icon, type } = entry;

        return (
            <Form.Item
                name={name}
                rules={rules}
            >
                <Input type={type} placeholder={placeholder} prefix={icon} />
            </Form.Item>
        )
    })
};

const FormContainer = () => {
    const formParentStyle = {
        border: "0.1px solid rgba(0,0,0,0.1)",
        borderRadius: 15,
        backgroundColor: "white",
        overflow: "hidden",
    };

    const [FormInstance] = Form.useForm();

    const signUp = async (details) => {
        await signupUser();
    };

    const onFinishFailed = error => {
        console.log(error);
    };


    return (
        <Col sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 14 }}>
            <Row style={formParentStyle} className="hoverable">
                <LoginSection
                    cta="Login"
                    ctaHref="/signin"
                    title="Welcome Back!"
                    description="To keep connected with us, sign in with your personal info<"
                />

                <Col xs={{ span: 20 }} md={{ span: 12 }} style={{ minHeight: "60vh" }}>
                    <section style={{ padding: 60 }}>
                        <Divider orientation="left">Sign Up to Create Account</Divider>
                        <section style={{ padding: "20px 0px", display: "flex", justifyContent: "space-around" }}>
                            {/* {loading && <Spin />}
                                        {errors && <section>Server unreachable </section>}
                                        {authError && <Alert type="error" showIcon message={authError} />}
                                        {requestMessage && <Alert type="success" showIcon message={requestMessage} />} */}
                        </section>
                        <Form
                            form={FormInstance}
                            layout="vertical"
                            name="signupform"
                            initialValues={{ remember: true }}
                            onFinishFailed={onFinishFailed}
                            onFinish={async values => {
                                const res = await signUp(values);
                                console.log('res==>', res)
                                // if (errors) {
                                //     return false;
                                // }
                                // if (error?.field) {
                                //     return setAuthError(error?.message);
                                // }
                                // // on successfull account request, inform user to check their email
                                // if (message) {
                                //     return router.push("/instructions?message=Verify your email");
                                // }
                            }}
                            autoComplete="off"
                        >
                            <FormFields formItems={formItems} />
                            <Footer text="Have an account?" cta="Login" cta2="Sign Up" ctaHref="/signin" />
                        </Form>
                    </section>
                </Col>
            </Row>
        </Col>
    )
};

export default FormContainer