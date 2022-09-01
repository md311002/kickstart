import { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory"
import { useRouter } from "next/router";

export default function CampaignNew() {
    const router = useRouter();
    const [minContri, setMinContri] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);

    function changeHandler(event) {
        setMinContri(event.target.value)
    }
    async function onSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setErrMsg("");

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(minContri)
                .send({ from: accounts[0] });
            router.push('/')
        } catch (error) {
            setErrMsg(error.message)
        }
        setLoading(false)

    }
    return (
        <Layout>
            <h3>Create Campaign</h3>
            <Form onSubmit={onSubmit} error={!!errMsg}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label='wei'
                        labelPosition='right'
                        value={minContri}
                        onChange={changeHandler}
                    />
                </Form.Field>
                <Message error header="Oops!" content={errMsg}></Message>
                <Button primary loading={loading}>Create</Button>
            </Form>
        </Layout>
    )
}