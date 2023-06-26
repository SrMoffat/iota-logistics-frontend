import Head from "next/head";
import Link from "next/link";

import { AccountBookOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import { Form, Layout, Row, Col, Typography, Button, Divider, Spin, Input } from 'antd';
import { useRouter } from 'next/router';

import { signupUser } from '../lib/users';

const formParentStyle = {
    border: "0.1px solid rgba(0,0,0,0.1)",
    borderRadius: 15,
    backgroundColor: "white",
    overflow: "hidden",
};

const infoBlockStyle = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
};

const SignUp = () => {
    const router = useRouter();
    const [FormInstance] = Form.useForm();

    const signUp = async (details) => {
        await signupUser();
    };

    const onFinishFailed = error => {
        console.log(error);
    };


    return (
        <Layout>
            <Head>
                <title>Sign Up</title>
            </Head>
            <Layout.Content
                style={{
                    margin: 0,
                }}
            >
                <Row justify="space-around" align="middle" style={{ minHeight: "100vh" }}>
                    <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                        <section>
                            <Link href="/">
                                Logo
                            </Link>
                        </section>
                    </Col>
                    <Col sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 14 }}>
                        <Row style={formParentStyle} className="hoverable">
                            <Col xs={{ span: 0 }} md={{ span: 12 }} className="blue-linear-bg-gradient">
                                <section style={{ ...infoBlockStyle, flexDirection: "column" }}>
                                    <Typography.Title level={1} className="text-white">
                                        Welcome Back!
                                    </Typography.Title>
                                    <p>To keep connected with us, sign in with your personal info</p>
                                    <Button type="primary" shape="round" size="large">
                                        <Link href="/signin" passHref>
                                           Login
                                        </Link>
                                    </Button>
                                </section>
                            </Col>
                            <Col xs={{ span: 20 }} md={{ span: 12 }} style={{ minHeight: "60vh" }}>
                                <section style={{ padding: 60 }}>
                                    <Divider orientation="left">Request access to create your Account</Divider>
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
                                        <Form.Item
                                            name="username"
                                            rules={[
                                                {
                                                    type: "string",
                                                    message: "Username is required",
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Jane Doe" prefix={<AccountBookOutlined />} />
                                        </Form.Item>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    type: "email",
                                                    message: "Email is required",
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input type="email" placeholder="someone@example.com" prefix={<MailOutlined />} />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    type: "string",
                                                    message: "Password is required",
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input type="password" placeholder="*********" prefix={<LockOutlined />} />
                                        </Form.Item>
                                        <Row align="middle">
                                            <Col sm={{ span: 24 }} md={{ span: 15 }}>
                                                Have an account? &nbsp;
                                                <Link href="/signin" passHref>
                                                    Login
                                                </Link>
                                            </Col>
                                            <Col sm={{ span: 24 }} md={{ span: 7 }}>
                                                <Form.Item>
                                                    <Button htmlType="submit" size="large" type="primary" shape="round">
                                                        Request Access
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </section>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    )
};

export default SignUp;