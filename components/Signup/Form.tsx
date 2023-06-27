import React, { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Row, Col, Divider, Spin, Alert } from 'antd';

import Footer from './Footer';
import LoginSection from './Login';
import FormFields from '../Form/Fields';
import FormComponent from '../Form/Form';

import { signupUser } from '../../lib/users';
import { UserDetails } from '../../lib/types';
import { FORM_ITEMS, FORM_PARENT_STYLES } from '../../lib/constants';

const FormContainer = () => {
    const [error, setError] = useState('');
    const { mutate, isError, isLoading, isSuccess } = useMutation({
        mutationFn: (details: UserDetails) => {
            return signupUser(details);
        },
        onError: (error: Error) => {
            setError(error.message)
        }
    })

    const onFinishFailed = error => {
        console.log("error===>", error);
    };

    const onFinish = async (values: UserDetails) => {
        const res = mutate(values)
        console.log('res==>', res)
        // const res = await signUp(values);
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
            <Row style={FORM_PARENT_STYLES} className="hoverable">
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
                            {isLoading && <Spin />}
                            {isError && <Alert type="error" showIcon message={error} />}
                            {isSuccess && <Alert type="success" showIcon message="Successfully signed up!" />}
                        </section>
                        <FormComponent
                            name="signupForm"
                            layout="vertical"
                            autoComplete="off"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            initialValues={{ remember: true }}
                        >
                            <FormFields formItems={FORM_ITEMS} />
                            <Footer text="Have an account?" cta="Login" cta2="Sign Up" ctaHref="/signin" />
                        </FormComponent>
                    </section>
                </Col>
            </Row>
        </Col>
    )
};

export default FormContainer