import Web3 from "web3";


let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);

} else {

    const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/6011561c035a42f484a9321f902f3e57');
    web3 = new Web3(provider);

}
export default web3;