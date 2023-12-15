// Import contract ABIs and addresses
const { positionABI, positionAddress } require ('./positionManagerV3');
const { stakerAddress } require ('./stakerV3');
const { Web3 } require ('web3');

// Define incentive data management functions and import them.
// Example on how to retrieve those values is in: 
// https://gist.github.com/msvstj/2e70cf27b75fc223964aee91e79626d7
const { getSelectedIncentiveTuple, getIncentiveKeyEncoded } from ('./encodeIncentives');

// Select Web3 provider and initialize contract
const web3 = new Web3('<<metamask/other provider>>');
const positionContract = new web3.eth.Contract(
        positionABI,
        positiontAddress
);

async function stakePosition(tokenId: number, idx: number) {
    const selectedTuple = getSelectedIncentiveTuple(idx);
    const encodedIncentive = getIncentiveKeyEncoded(selectedTuple);
    const accounts = await web3.eth.getAccounts();
    
    // Form a transaction of two functions: approve and safeTransferFrom
    const stakingCalls = [
        positionContract.methods.approve(
            stakerAddress, 
            tokenId).encodeABI(),
        positionContract.methods.safeTransferFrom(
            accounts[0], 
            stakerAddress, 
            tokenId, 
            encodedIncentive).encodeABI()
     ];
     
     await positionContract.methods.multicall(stakingCalls)
        .send({ from: accounts[0] })
        .then( //do things );
}