import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from "ethers";
import { EthersContractContextV5 } from "ethereum-abi-types-generator";

export type ContractContext = EthersContractContextV5<
  ChainAidContract,
  ChainAidContractMethodNames,
  ChainAidContractEventsContext,
  ChainAidContractEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type ChainAidContractEvents = undefined;
export interface ChainAidContractEventsContext {}
export type ChainAidContractMethodNames =
  | "new"
  | "addMember"
  | "addOrg"
  | "getAllOrgs"
  | "owner"
  | "payMember";
export interface OrgResponse {
  id: BigNumber;
  0: BigNumber;
  name: string;
  1: string;
  email: string;
  2: string;
  url: string;
  3: string;
  contactNo: string;
  4: string;
  _orgAddress: string;
  5: string;
  balance: BigNumber;
  6: BigNumber;
  isVerified: boolean;
  7: boolean;
}
export interface ChainAidContract {
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: constructor
   */
  "new"(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOrg Type: address, Indexed: false
   */
  addMember(
    newOrg: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param name Type: string, Indexed: false
   */
  addOrg(
    name: string,
    email: string,
    url: string,
    contactNo: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getAllOrgs(overrides?: ContractCallOverrides): Promise<OrgResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param member Type: address, Indexed: false
   */
  payMember(
    member: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
}
