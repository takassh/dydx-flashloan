/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace Account {
  export type InfoStruct = { owner: string; number: BigNumberish };

  export type InfoStructOutput = [string, BigNumber] & {
    owner: string;
    number: BigNumber;
  };
}

export interface ICalleeInterface extends utils.Interface {
  contractName: "ICallee";
  functions: {
    "callFunction(address,(address,uint256),bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "callFunction",
    values: [string, Account.InfoStruct, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "callFunction",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ICallee extends BaseContract {
  contractName: "ICallee";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ICalleeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    callFunction(
      sender: string,
      accountInfo: Account.InfoStruct,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  callFunction(
    sender: string,
    accountInfo: Account.InfoStruct,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    callFunction(
      sender: string,
      accountInfo: Account.InfoStruct,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    callFunction(
      sender: string,
      accountInfo: Account.InfoStruct,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    callFunction(
      sender: string,
      accountInfo: Account.InfoStruct,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
