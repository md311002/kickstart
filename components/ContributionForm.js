import { Router } from '../routes';
import { useState } from 'react';
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3';
import { Form, Input, Message, Button } from 'semantic-ui-react';

export default function ContributionForm(props) {
    const { address } = props;
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(event) {
        event.preventDefault();

        const campaign = Campaign(address);
        setErrorMsg('');
        setLoading(true);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
            Router.replaceRoute(`/campaign/show/${address}`);
        } catch (error) {
            setErrorMsg(error)
        }
        setLoading(false);
        setValue('')
    }



    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    label="ether"
                    labelPosition="right"
                />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>
                Contribute!
            </Button>
        </Form>
    )
}