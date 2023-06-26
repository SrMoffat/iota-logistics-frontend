import { Layout, Row } from 'antd';

import Logo from '../components/Signup/Logo';
import Header from '../components/Signup/Header';
import FormContainer from '../components/Login/Form';

const SignIn = () => {
    return (
        <Layout>
            <Header title="Sign In" />
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

export default SignIn;