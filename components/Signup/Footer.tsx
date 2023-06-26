import Link from "next/link";

import { Form, Row, Col, Button } from 'antd';

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

export default Footer;
