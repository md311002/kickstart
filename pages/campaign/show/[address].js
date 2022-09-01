import { Button, Card, Grid } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign'
import Layout from '../../../components/Layout';
import ContributionForm from '../../../components/ContributionForm';
import web3 from '../../../ethereum/web3';
import factory from '../../../ethereum/factory'
import Link from 'next/link';

export default function ShowCampaign(props) {
    const { address, minimumContribution, balance, requestCount, approversCount, manager } = props;
    function renderCards() {
        const items = [
            {
                header: manager,
                meta: "Address of Manager",
                description:
                    "The manager created this campaign and can create requests to withdraw money",
                style: { overflowWrap: "break-word" },
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution (wei)",
                description:
                    "You must contribute at least this much wei to become an approver",
            },
            {
                header: requestCount,
                meta: "Number of Requests",
                description:
                    "A request tries to withdraw money from the contract. Requests must be approved by approvers",
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description:
                    "Number of people who have already donated to this campaign",
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign Balance (ether)",
                description:
                    "The balance is how much money this campaign has left to spend.",
            },
        ];
        return <Card.Group items={items} />;

    }
    return (
        <Layout>
            <h3>Campaign Show</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>{renderCards()}</Grid.Column>
                    <Grid.Column width={6}>
                        <ContributionForm address={address}></ContributionForm>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link href={`/campaign/requests/${address}`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )

}


export async function getStaticPaths() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    const paramsAddress = campaigns.map(campaignAddrees => ({ params: { address: campaignAddrees } }))
    return {
        paths: paramsAddress,
        fallback: 'blocking'
    };
}

export async function getStaticProps(context) {
    const { params } = context;
    const campaignaddress = params.address;
    const campaign = Campaign(campaignaddress);
    const summary = await campaign.methods.getSummary().call();


    return {
        props: {
            address: campaignaddress,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
        }
    }

}
