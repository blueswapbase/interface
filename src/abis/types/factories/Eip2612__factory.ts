/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Eip2612, Eip2612Interface } from "../Eip2612";

const _abi = [
  {
    constant: true,
    inputs: [
      {
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export class Eip2612__factory {
  static readonly abi = _abi;
  static createInterface(): Eip2612Interface {
    return new utils.Interface(_abi) as Eip2612Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Eip2612 {
    return new Contract(address, _abi, signerOrProvider) as Eip2612;
  }
}