import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react';
import { Col, Row, Layout, Button, Divider } from 'antd';

import Title from "antd/lib/typography/Title";

const Footer = () => {
    return (
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
            {/* bottom divider for more information */}
            <Divider orientation="left">IOTA - Logistics &copy; {new Date().getFullYear()}.</Divider>
        </Layout.Footer>
    );
};

const name = '[Your Name]'
export const siteTitle = 'Next.js Sample Website'

export default function Home({
    children,
    home
}: {
    children: React.ReactNode
    home?: boolean
}) {
    return (
        <Fragment>
            <Layout>
                <Head>
                    <title>Welcome to IOTA Logistics</title>
                </Head>
                <Layout.Content>
                    <Row style={{ height: "70vh" }} justify="center" align="middle">
                        <Col span={6}>
                            <Link href="/signin" as="/signin" passHref>
                                <Button type="primary" shape="round">
                                    Sign In
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <Footer />
                </Layout.Content>
            </Layout>
        </Fragment>
    )
}