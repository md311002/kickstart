import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from '../routes'

export default function RequestRow(props) {
    const { id, request, address, approversCount } = props;
    const { value, complete, description, recipient, approvalCount } = request;
    async function onApprove() {
        const campaign = Campaign(address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(id).send({
            from: accounts[0]
        })
        Router.pushRoute(`/campaign/requests/${address}`)
    }
    async function onFinalize() {
        const campaign = Campaign(address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(id).send({
            from: accounts[0]
        })
        Router.pushRoute(`/campaign/requests/${address}`)
    }
    return (
        <Table.Row disabled={complete}
            positive={(approvalCount > approversCount / 2) && !complete}>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{description}</Table.Cell>
            <Table.Cell>{web3.utils.fromWei(value, 'ether')}</Table.Cell>
            <Table.Cell>{recipient}</Table.Cell>
            <Table.Cell>{approvalCount}/{approversCount}</Table.Cell>
            <Table.Cell>
                {!complete && <Button color="green" basic onClick={onApprove}>
                    Approve
                </Button>}
            </Table.Cell>
            <Table.Cell>
                {!complete && <Button color="teal" basic onClick={onFinalize}>
                    Finalize
                </Button>}
            </Table.Cell>

        </Table.Row>

    )
}