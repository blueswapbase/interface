// Using separate web3 subpackages for the specific example
// If full web3 package is used, you can switch to:
// const Web3 = require('web3');
// web3 = new Web3(<<any web3 provider>>);
// Then use its sub packages: web3.eth.abi or web3.utils
const Web3EthAbi = require('web3-eth-abi')
const Web3Utils = require('web3-utils')
const { tupleType, incentives } = require('./incentives-config.json')

// Function to convert config values to tuple
function getSelectedIncentiveTuple(idx: number) {
  return [
    incentives[idx].rewardToken,
    incentives[idx].poolAddress,
    incentives[idx].startDate,
    incentives[idx].endDate,
    incentives[idx].refundee,
  ]
}

// 1. Select the first incentive.
const incentiveTuple = getSelectedIncentiveTuple(0)
console.log('Selected incentive - pass this to stake / unstake or withdraw (Staker contract):\n', incentiveTuple)

// 2. Encode the incentive tuple.
const incentiveKeyEncoded = Web3EthAbi.encodeParameter(tupleType, incentiveTuple)
console.log(
  'Encoded incentive key - pass this to safeTransfer function (NFTPositionManager contract):\n',
  incentiveKeyEncoded
)

// 3. Hash the encoded incentive.
const incentiveKeyHashed = Web3Utils.keccak256(incentiveKeyEncoded)
console.log('Hashed incentive key - pass this to views (Staker contract):\n', incentiveKeyHashed)
