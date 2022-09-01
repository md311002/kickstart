import Campaign from '../../../../ethereum/campaign'
import web3 from '../../../../ethereum/web3'
import factory from '../../../../ethereum/factory'
import Layout from '../../../../components/Layout'
import Link from 'next/link';
import { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import { useRouter } from 'next/router';

export default function NewRequest(props) {
    const router = useRouter();
    const { address } = props;
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [recipient, setRecipient] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function onSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        const campaign = Campaign(address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({
                    from: accounts[0]
                });
            router.push(`/campaign/requests/${address}`);
        } catch (error) {
            setErrorMessage(error.message);
        }
        setLoading(false)
    }



    return (
        <Layout>
            <Link href={`/campaign/requests/${address}`}>
                <a>Back</a>
            </Link>
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={recipient}
                        onChange={(event) => setRecipient(event.target.value)}
                    />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage} />
                <Button primary loading={loading}>
                    Create!
                </Button>
            </Form>

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


    return {
        props: { address: campaignaddress }
    }

}


// export async function getSeverSideProps(context) {


//     return {
//         props: {
//             address: context.query.address
//         }
//     }

// }
// import React, { Component } from "react";
// import { Form, Button, Message, Input } from "semantic-ui-react";
// import Campaign from "../../../ethereum/campaign";
// import web3 from "../../../ethereum/web3";
// import { Link, Router } from "../../../routes";
// import Layout from "../../../components/Layout";

// class RequestNew extends Component {
//     state = {
//         value: "",
//         description: "",
//         recipient: "",
//         loading: false,
//         errorMessage: "",
//     };

//     static async getInitialProps(props) {
//         const { address } = props.query;

//         return { address };
//     }

//     onSubmit = async (event) => {
//         event.preventDefault();

//         const campaign = Campaign(this.props.address);
//         const { description, value, recipient } = this.state;

//         this.setState({ loading: true, errorMessage: "" });

//         try {
//             const accounts = await web3.eth.getAccounts();
//             await campaign.methods
//                 .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
//                 .send({ from: accounts[0] });
//             Router.pushRoute(`/campaigns/${this.props.address}/requests`);
//         } catch (err) {
//             this.setState({ errorMessage: err.message });
//         }
//         this.setState({ loading: false });
//     };

//     render() {
//         return (
//             <Layout>
//                 <Link route={`/campaigns/${this.props.address}/requests`}>
//                     <a>Back</a>
//                 </Link>
//                 <h3>Create a Request</h3>
//                 <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
//                     <Form.Field>
//                         <label>Description</label>
//                         <Input
//                             value={this.state.description}
//                             onChange={(event) =>
//                                 this.setState({ description: event.target.value })
//                             }
//                         />
//                     </Form.Field>
//                     <Form.Field>
//                         <label>Value in Ether</label>
//                         <Input
//                             value={this.state.value}
//                             onChange={(event) => this.setState({ value: event.target.value })}
//                         />
//                     </Form.Field>
//                     <Form.Field>
//                         <label>Recipient</label>
//                         <Input
//                             value={this.state.recipient}
//                             onChange={(event) =>
//                                 this.setState({ recipient: event.target.value })
//                             }
//                         />
//                     </Form.Field>
//                     <Message error header="Oops!" content={this.state.errorMessage} />
//                     <Button primary loading={this.state.loading}>
//                         Create!
//                     </Button>
//                 </Form>
//             </Layout>
//         );
//     }
// }

// export default RequestNew;
