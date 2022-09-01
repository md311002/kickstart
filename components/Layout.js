import Head from "next/head";
import { Link } from "../routes";
import { Container, Menu } from "semantic-ui-react";
import React from "react";

export default function Layout(props) {
    return (
        <div>
            <Container>
                <Head>
                    <link
                        async
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                    />
                </Head>
                <Menu style={{ marginTop: "10px" }} >
                    <Link href='/'>
                        <a className="item">CrowdCoin </a>
                    </Link>
                    <Menu.Menu position="right">
                        <Link href='/'>
                            <a className="item"> Campaign </a>
                        </Link>
                        <Link href='/campaign/new'>
                            <a className="item">+</a>
                        </Link>
                    </Menu.Menu>
                </Menu>
                {props.children}
            </Container>
        </div>
    )
} 
