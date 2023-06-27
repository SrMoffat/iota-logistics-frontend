import React, { useState } from 'react';

import { remove } from 'lodash';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { Row, Col, Divider, notification, Spin, Alert } from 'antd';

import Footer from '../Signup/Footer';
import FormFields from '../Form/Fields';
import FormComponent from '../Form/Form';
import LoginSection from '../Signup/Login';

import { loginUser } from '../../lib/users';
import { UserDetails } from '../../lib/types';
import { useAuthContext } from '../../contexts/AuthProvider';
import { FORM_ITEMS, FORM_PARENT_STYLES } from '../../lib/constants';

const formItems = remove(FORM_ITEMS, (item) => `${item?.name}` === 'username');


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
        mutationFn: async (details: UserDetails) => {
            return await loginUser(details);
        },
        onError: (error: Error) => {
            setError(error.message)
        },
        onSuccess: () => {
            openNotification('top')
            setTimeout(() => {
                push('/dashboard');
            }, 1000)
        },
    })

    const onFinishFailed = error => {
        console.log(error);
    };

    const onFinish = async (values: UserDetails) => {
        await mutateAsync(values)
    };
    return (
        <>
            {contextHolder}
            <Col sm={{ span: 22 }} md={{ span: 18 }} lg={{ span: 14 }}>
                <Row style={FORM_PARENT_STYLES} className="hoverable">
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
                                onFinishFailed={onFinishFailed}
                                initialValues={{ remember: true }}
                            >
                                <FormFields formItems={formItems} />
                                <Footer loading={isLoading} text="Have an account?" cta="Login" cta2="Sign Up" ctaHref="/signin" />
                            </FormComponent>
                        </section>
                    </Col>
                </Row>
            </Col>
        </>
    )
};

export default FormContainer