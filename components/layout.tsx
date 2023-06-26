import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Fragment } from 'react';
import { Card, Col, Row, Layout, Button, Divider } from 'antd';

import Title from "antd/lib/typography/Title";

const Footer = () => {
  // component logic here

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
          <title>Welcome to IRIS</title>
        </Head>

        <Layout.Content>
          <Layout.Header></Layout.Header>

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
    // <div className={styles.container}>
    //   <Head>
    //     <link rel="icon" href="/favicon.ico" />
    //     <meta
    //       name="description"
    //       content="Learn how to build a personal website using Next.js"
    //     />
    //     <meta
    //       property="og:image"
    //       content={`https://og-image.vercel.app/${encodeURI(
    //         siteTitle
    //       )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
    //     />
    //     <meta name="og:title" content={siteTitle} />
    //     <meta name="twitter:card" content="summary_large_image" />
    //   </Head>
    //   <header className={styles.header}>
    //     {false ? (
    //       <>
    //         <Image
    //           priority
    //           src="/images/profile.jpg"
    //           className={utilStyles.borderCircle}
    //           height={144}
    //           width={144}
    //           alt={name}
    //         />
    //         <h1 className={utilStyles.heading2Xl}>{name}</h1>
    //       </>
    //     ) : (
    //       <>
    //         <Link href="/">
    //           <Image
    //             priority
    //             src="/images/profile.jpg"
    //             className={utilStyles.borderCircle}
    //             height={108}
    //             width={108}
    //             alt={name}
    //           />
    //         </Link>
    //         <h2 className={utilStyles.headingLg}>
    //           <Link href="/" className={utilStyles.colorInherit}>
    //             {name}
    //           </Link>
    //         </h2>
    //       </>
    //     )}
    //   </header>
    //   <main>{children}</main>
    //   {!home && (
    //     <div className={styles.backToHome}>
    //       <Link href="/">← Back to home</Link>
    //     </div>
    //   )}
    // </div>
  )
}