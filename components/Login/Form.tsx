import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Row, Col, Divider, notification, Spin, Alert } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

import Footer from '../Signup/Footer';
import FormFields from '../Form/Fields';
import FormComponent from '../Form/Form';
import LoginSection from '../Signup/Login';

import { UserLoginDetails } from '../../lib/types';
import { useAuthContext } from '../../contexts/AuthProvider';
import { FORM_ITEMS, GENERAL_CONSTANTS } from '../../lib/constants';

const formItems = [
    {
        ...FORM_ITEMS.EMAIL_FIELD,
        name: 'identifier'
    },
    FORM_ITEMS.PASSWORD_FIELD
];
const FormContainer = () => {
    const { push } = useRouter();
    const [error, setError] = useState('');
    const { login, user } = useAuthContext();
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement) => {
        api.success({
            message: 'Successfully Logged In',
            description: `Congrats ${user?.username}! Your account has been regsitered.`,
            placement,
        });
    };
    const { mutateAsync, isError, isLoading, isSuccess } = useMutation({
        mutationFn: async (details: UserLoginDetails) => {
            return await login(details);
        },
        onError: (error: Error) => {
            setError(error.message)
        },
        onSuccess: () => {
            openNotification('top')
            setTimeout(() => {
                push('/dashboard');
            }, 500);
        },
    })
    const onFinish = async (values: UserLoginDetails) => {
        await mutateAsync(values)
    };
    return (
        <>
            {contextHolder}
            <Col sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 14 }}>
                <Row style={GENERAL_CONSTANTS.FORM_PARENT_STYLES} className="hoverable">
                    <LoginSection
                        cta="Sign Up"
                        ctaHref="/signup"
                        title="No Account?"
                        description="To keep connected with us, sign up with your info for an account"
                    />

                    <Col xs={{ span: 20 }} md={{ span: 12 }} style={{ minHeight: "60vh" }}>
                        <section style={{ padding: 60 }}>
                            <Divider orientation="left">Login to Your Account</Divider>
                            <section style={{ padding: "20px 0px", display: "flex", justifyContent: "space-around" }}>
                                {isLoading && <Spin />}
                                {isError && <Alert type="error" showIcon message={error} />}
                                {isSuccess && <Alert type="success" showIcon message="Successfully logged in!" />}
                            </section>
                            <FormComponent
                                name="loginForm"
                                layout="vertical"
                                autoComplete="off"
                                onFinish={onFinish}
                                initialValues={{ remember: true }}
                            >
                                <FormFields formItems={formItems} />
                                <Footer loading={isLoading} text="Don't have an account?" cta="Sign Up" cta2="Login" ctaHref="/signup" />
                            </FormComponent>
                        </section>
                    </Col>
                </Row>
            </Col>
        </>
    )
};

export default FormContainer;
