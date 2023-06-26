import Head from "next/head";

const Header = (props) => {
    const { title } = props;
    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
};

export default Header;
