// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
pragma abicoder v2;

import "./interfaces/DydxFlashloanBase.sol";
import "./interfaces/ICallee.sol";
import "./interfaces/ISoloMargin.sol";

contract FlashLoan is ICallee, DydxFlashloanBase {
    // main 0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e
    // kovan 0x4EC3570cADaAEE08Ae384779B0f3A45EF85289DE
    address private constant SOLO = 0x4EC3570cADaAEE08Ae384779B0f3A45EF85289DE;

    // JUST FOR TESTING - ITS OKAY TO REMOVE ALL OF THESE VARS
    address public flashUser;

    event Log(string message, uint256 val);

    struct MyCustomData {
        address token;
        uint256 repayAmount;
    }

    function initiateFlashLoan(address _token, uint256 _amount) external {
        ISoloMargin solo = ISoloMargin(SOLO);

        uint256 marketId = _getMarketIdFromTokenAddress(SOLO, _token);

        // Calculate repay amount (_amount + (2 wei))
        uint256 repayAmount = _getRepaymentAmountInternal(_amount);
        IERC20(_token).approve(SOLO, repayAmount);

        /*
    1. Withdraw
    2. Call callFunction()
    3. Deposit back
    */

        Actions.ActionArgs[] memory operations = new Actions.ActionArgs[](3);

        operations[0] = _getWithdrawAction(marketId, _amount);
        operations[1] = _getCallAction(
            abi.encode(MyCustomData({token: _token, repayAmount: repayAmount}))
        );
        operations[2] = _getDepositAction(marketId, repayAmount);

        Account.Info[] memory accountInfos = new Account.Info[](1);
        accountInfos[0] = _getAccountInfo();

        solo.operate(accountInfos, operations);
    }

    function callFunction(
        address sender,
        Account.Info memory account,
        bytes memory data
    ) public override {
        require(msg.sender == SOLO, "!solo");
        require(sender == address(this), "!this contract");

        MyCustomData memory mcd = abi.decode(data, (MyCustomData));
        uint256 repayAmount = mcd.repayAmount;

        uint256 balance = IERC20(mcd.token).balanceOf(address(this));
        require(balance >= repayAmount, "balance < repay");

        // More code here...
        flashUser = sender; // this contract
        emit Log("balance", balance);
        emit Log("repay", repayAmount);
        emit Log("balance - repay", balance - repayAmount);
    }
}
