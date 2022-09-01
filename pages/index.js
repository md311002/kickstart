import React from "react";
import factory from '../ethereum/factory';
import Layout from "../components/Layout";
import Link from "next/link";
import { Button, Card } from "semantic-ui-react";

export default function CampaignIndex(props) {
    const { campaigns } = props;

    function renderCampaigns() {
        const items = campaigns.map((address) => {
            return {
                header: address,
                description: (
                    <Link href={`/campaign/show/${address}`} >
                        <a>view campaign</a>
                    </Link>
                ),
                fluid: true,
            };
        });
        return <Card.Group items={items} />;
    }


    return (
        <Layout>
            <div>
                <h3>Open Campaigns</h3>
                <Link href='/campaign/new'>
                    <a>
                        <Button
                            floated="right"
                            content='create campaign'
                            icon='add circle'
                            primary>
                        </Button>
                    </a>
                </Link>
                {renderCampaigns()}
            </div>

        </Layout>
    )
}

export async function getServerSideProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return {
        props: {
            campaigns
        }
    }

}