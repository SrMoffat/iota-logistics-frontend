import Link from "next/link";


import { Col } from 'antd';


const Logo = (props) => {
    const { logo } = props;
    return (
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <section>
                <Link href="/">
                    {logo}
                </Link>
            </section>
        </Col>
    );
};

export default Logo;
