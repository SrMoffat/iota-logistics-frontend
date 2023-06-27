import React from 'react';

import { Row, Col, Divider } from 'antd';

import { signupUser } from '../../lib/users';
import { formItems } from '../../lib/constants';

import FormFields from '../Form/Fields';
import FormComponent from '../Form/Form';

import Footer from './Footer';
import LoginSection from './Login';

const FormContainer = () => {
    const formParentStyle = {
        border: "0.1px solid rgba(0,0,0,0.1)",
        borderRadius: 15,
        backgroundColor: "white",
        overflow: "hidden",
    };

    const signUp = async (details) => {
        await signupUser();
    };

    const onFinishFailed = error => {
        console.log(error);
    };

    const onFinish = async (values) => {
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
                        <FormComponent
                            name="signupForm"
                            layout="vertical"
                            autoComplete="off"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues={{ remember: true }}
                        >
                            <FormFields formItems={formItems} />
                            <Footer text="Have an account?" cta="Login" cta2="Sign Up" ctaHref="/signin" />
                        </FormComponent>
                    </section>
                </Col>
            </Row>
        </Col>
    )
};

export default FormContainer