import Head from "next/head";
import Link from "next/link";

import { AccountBookOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import { Form, Layout, Row, Col, Typography, Button, Divider, Spin, Input } from 'antd';
import { useRouter } from 'next/router';

import { signupUser } from '../lib/users';



const infoBlockStyle = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
};

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

const Header = (props) => {
    const { title } = props;
    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
};

const Logo = (props) => {
    const { logo } = props;
    return (
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <section>
                <Link href="/">
                    {logo}
                </Link>
            </section>
        </Col>
    );
};

const LoginSection = (props) => {
    const { title, description, cta } = props;
    return (
        <Col xs={{ span: 0 }} md={{ span: 12 }} className="blue-linear-bg-gradient">
            <section style={{ ...infoBlockStyle, flexDirection: "column" }}>
                <Typography.Title level={1} className="text-white">
                    {title}
                </Typography.Title>
                <p>{description}</p>
                <Button type="primary" shape="round" size="large">
                    <Link href="/signin" passHref>
                        {cta}
                    </Link>
                </Button>
            </section>
        </Col>
    );
};

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

const Footer = (props) => {
    const { text, cta, cta2 } = props;
    return (
        <Row align="middle">
            <Col sm={{ span: 24 }} md={{ span: 15 }}>
                {text} &nbsp;
                <Link href="/signin" passHref>
                    {cta}
                </Link>
            </Col>
            <Col sm={{ span: 24 }} md={{ span: 7 }}>
                <Form.Item>
                    <Button htmlType="submit" size="large" type="primary" shape="round">
                        {cta2}
                    </Button>
                </Form.Item>
            </Col>
        </Row>
    )
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
                            <Footer text="Have an account?" cta="Login" cta2="Request Access" />
                        </Form>
                    </section>
                </Col>
            </Row>
        </Col>
    )

};

const SignUp = () => {
    const router = useRouter();
    return (
        <Layout>
            <Header title="Sign Up" />
            <Layout.Content
                style={{
                    margin: 0,
                }}
            >
                <Row justify="space-around" align="middle" style={{ minHeight: "100vh" }}>
                    <Logo />
                    <FormContainer />
                </Row>
            </Layout.Content>
        </Layout>
    )
};

export default SignUp;