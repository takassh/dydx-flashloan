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
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace Account {
  export type InfoStruct = { owner: string; number: BigNumberish };

  export type InfoStructOutput = [string, BigNumber] & {
    owner: string;
    number: BigNumber;
  };
}

export interface FlashLoanArbitrageInterface extends utils.Interface {
  contractName: "FlashLoanArbitrage";
  functions: {
    "callFunction(address,(address,uint256),bytes)": FunctionFragment;
    "initiateFlashLoan(address,uint256,address,address)": FunctionFragment;
    "swapRouter1()": FunctionFragment;
    "swapRouter2()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "callFunction",
    values: [string, Account.InfoStruct, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initiateFlashLoan",
    values: [string, BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "swapRouter1",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "swapRouter2",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "callFunction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initiateFlashLoan",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapRouter1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapRouter2",
    data: BytesLike
  ): Result;

  events: {
    "Log(string,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Log"): EventFragment;
}

export type LogEvent = TypedEvent<
  [string, BigNumber],
  { message: string; val: BigNumber }
>;

export type LogEventFilter = TypedEventFilter<LogEvent>;

export interface FlashLoanArbitrage extends BaseContract {
  contractName: "FlashLoanArbitrage";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FlashLoanArbitrageInterface;

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
      account: Account.InfoStruct,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initiateFlashLoan(
      _token: string,
      _amount: BigNumberish,
      _swapRouter1: string,
      _swapRouter2: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapRouter1(overrides?: CallOverrides): Promise<[string]>;

    swapRouter2(overrides?: CallOverrides): Promise<[string]>;
  };

  callFunction(
    sender: string,
    account: Account.InfoStruct,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initiateFlashLoan(
    _token: string,
    _amount: BigNumberish,
    _swapRouter1: string,
    _swapRouter2: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapRouter1(overrides?: CallOverrides): Promise<string>;

  swapRouter2(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    callFunction(
      sender: string,
      account: Account.InfoStruct,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    initiateFlashLoan(
      _token: string,
      _amount: BigNumberish,
      _swapRouter1: string,
      _swapRouter2: string,
      overrides?: CallOverrides
    ): Promise<void>;

    swapRouter1(overrides?: CallOverrides): Promise<string>;

    swapRouter2(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Log(string,uint256)"(message?: null, val?: null): LogEventFilter;
    Log(message?: null, val?: null): LogEventFilter;
  };

  estimateGas: {
    callFunction(
      sender: string,
      account: Account.InfoStruct,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initiateFlashLoan(
      _token: string,
      _amount: BigNumberish,
      _swapRouter1: string,
      _swapRouter2: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapRouter1(overrides?: CallOverrides): Promise<BigNumber>;

    swapRouter2(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    callFunction(
      sender: string,
      account: Account.InfoStruct,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initiateFlashLoan(
      _token: string,
      _amount: BigNumberish,
      _swapRouter1: string,
      _swapRouter2: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapRouter1(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    swapRouter2(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
