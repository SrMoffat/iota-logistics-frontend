import Link from 'next/link'
import { Layout, Row, Col, Typography, Divider } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
  return (
    <Layout>
      <Content style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <div style={{ height: '600px', background: 'url("/images/background.jpg")' }}>
          <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col>
              <Title level={1} style={{ color: '#ffffff', textAlign: 'center' }}>
                Welcome to IOTA Logistics
              </Title>
            </Col>
          </Row>
        </div>
        <Layout.Footer>
            <Row gutter={[10, 10]} className="website-footer">
                <Col span={8} className="footer-links">
                    <Title level={3}>Sign Up</Title>
                    <Link href="/signup" passHref>
                        Sign Up
                    </Link>
                </Col>

                <Col span={8} className="footer-links">
                    <Title level={3}>Login</Title>
                    <Link href="/signin" passHref>
                        Login
                    </Link>
                </Col>

                <Col span={8} className="footer-links">
                    <Title level={3}>Documentation</Title>
                    <Link href="/documentation" passHref>
                        Documentation
                    </Link>
                </Col>
            </Row>
            <Divider orientation="left">IOTA - Logistics &copy; {new Date().getFullYear()}.</Divider>
        </Layout.Footer>
      </Content>
    </Layout>
  );
};

export default HomePage;
