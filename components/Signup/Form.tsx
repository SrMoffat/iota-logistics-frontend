import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Row, Col, Divider, Spin, Alert, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

import Footer from './Footer';
import LoginSection from './Login';
import FormFields from '../Form/Fields';
import FormComponent from '../Form/Form';

import { UserDetails } from '../../lib/types';
import { useAuthContext } from '../../contexts/AuthProvider';
import { FORM_ITEMS, GENERAL_CONSTANTS } from '../../lib/constants';

const FormContainer = () => {
    const { push } = useRouter();
    const [error, setError] = useState('');
    const { signup, user } = useAuthContext();
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement) => {
        api.success({
            message: 'Successfully Registered',
            description: `Congrats ${user?.username}! Your account has been regsitered.`,
            placement,
        });
    };
    const { mutateAsync, isError, isLoading, isSuccess } = useMutation({
        mutationFn: async (details: UserDetails) => {
            return await signup(details);
        },
        onError: (error: Error) => {
            setError(error.message)
        },
        onSuccess: () => {
            openNotification('top')
            setTimeout(() => {
                push('/dashboard');
            }, 500)
        },
    })
    const onFinish = async (values: UserDetails) => {
        await mutateAsync(values)
    };
    return (
        <>
            {contextHolder}
            <Col sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 14 }}>
                <Row style={GENERAL_CONSTANTS.FORM_PARENT_STYLES } className="hoverable">
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
                                initialValues={{ remember: true }}
                            >
                                <FormFields formItems={FORM_ITEMS.FORM_ITEMS} />
                                <Footer loading={isLoading} text="Have an account?" cta="Login" cta2="Sign Up" ctaHref="/signin" />
                            </FormComponent>
                        </section>
                    </Col>
                </Row>
            </Col>
        </>
    )
};

export default FormContainer;
