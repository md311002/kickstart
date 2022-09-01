import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x1188F33739584A600864ec0a27AA5b90fB138E21'
);

export default instance;