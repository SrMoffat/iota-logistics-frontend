import Link from "next/link";
import { Col, Typography, Button } from 'antd';

const LoginSection = (props) => {
    const infoBlockStyle = {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
    };
    const { title, description, cta, ctaHref } = props;
    return (
        <Col xs={{ span: 0 }} md={{ span: 12 }} className="blue-linear-bg-gradient">
            <section style={{ ...infoBlockStyle, flexDirection: "column" }}>
                <Typography.Title level={1} className="text-white">
                    {title}
                </Typography.Title>
                <p>{description}</p>
                <Button type="primary" shape="round" size="large">
                    <Link href={ctaHref} passHref>
                        {cta}
                    </Link>
                </Button>
            </section>
        </Col>
    );
};

export default LoginSection