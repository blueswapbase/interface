// Import contract ABIs and addresses
const { stakerABI, stakerAddress } require ('./stakerV3');
const { Web3 } require ('web3');

// Define incentive data management functions and import them.
// Example on how to retrieve those values is in: 
// https://gist.github.com/msvstj/2e70cf27b75fc223964aee91e79626d7
const { getSelectedIncentiveTuple } from ('./encodeIncentives');

// Select Web3 provider and initialize contract
const web3 = new Web3('<<metamask/other provider>>');
const stakerContract = new web3.eth.Contract(
        stakerABI,
        stakerAddress
);

async function unstakePosition(tokenId: number, idx: number) {
    const selectedTuple = getSelectedIncentiveTuple(idx);
    const accounts = await web3.eth.getAccounts();
    
    // Form a transaction of two functions: unstake and withdrawToken
    const unstakingCalls = [
        uniswapStake.methods.unstakeToken(
            selectedTuple, 
            tokenId).encodeABI(),
        uniswapStake.methods.withdrawToken(
            tokenId, 
            accounts[0], 
            []).encodeABI()
     ];
     
     await stakerContract.methods.multicall(unstakingCalls)
        .send({ from: accounts[0] })
        .then( //do things );
}