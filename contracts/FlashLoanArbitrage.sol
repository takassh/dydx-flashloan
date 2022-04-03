// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
pragma abicoder v2;

import "./interfaces/DydxFlashloanBase.sol";
import "./interfaces/ICallee.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract FlashLoanArbitrage is ICallee, DydxFlashloanBase {
    using SafeMath for uint256;

    // main 0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e
    // kovan 0x4EC3570cADaAEE08Ae384779B0f3A45EF85289DE
    address private constant SOLO = 0x4EC3570cADaAEE08Ae384779B0f3A45EF85289DE;
    // main 0x6B175474E89094C44Da98b954EedeAC495271d0F
    // kovan 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa
    address private constant DAI = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;

    event Log(string message, uint256 val);

    IUniswapV2Router02 public swapRouter1;
    IUniswapV2Router02 public swapRouter2;

    address private owner;

    struct MyCustomData {
        address token;
        uint256 repayAmount;
    }

    constructor(){
        owner = msg.sender;
    }

    function initiateFlashLoan(
        address _token,
        uint256 _amount,
        address _swapRouter1,
        address _swapRouter2
    ) external {
        ISoloMargin solo = ISoloMargin(SOLO);

        swapRouter1 = IUniswapV2Router02(_swapRouter1);
        swapRouter2 = IUniswapV2Router02(_swapRouter2);

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

        emit Log("repay", repayAmount);

        emit Log("before balance", balance);

        uint256 amountOut = swapExactInputSingle(
            balance,
            mcd.token,
            DAI,
            true
        );

        uint256 _balance = IERC20(mcd.token).balanceOf(address(this));

        emit Log("after 1 balance", _balance);

        swapExactInputSingle(amountOut, DAI, mcd.token, false);

        uint256 __balance = IERC20(mcd.token).balanceOf(address(this));

        emit Log("after 2 balance", __balance);

        uint256 profit = __balance.sub(repayAmount);

        emit Log("profit", profit);

        IERC20(mcd.token).transfer(owner, profit);
    }

    function swapExactInputSingle(
        uint256 amountIn,
        address from,
        address to,
        bool first
    ) private returns (uint256 amountOut) {
        TransferHelper.safeApprove(
            from,
            address(first ? swapRouter1 : swapRouter2),
            amountIn
        );

        address[] memory path = new address[](2);
        path[0] = from;
        path[1] = to;

        uint256[] memory amountOuts = (first ? swapRouter1 : swapRouter2)
            .swapExactTokensForTokens(
                amountIn,
                0,
                path,
                address(this),
                block.timestamp
            );

        amountOut = amountOuts[1];
    }
}
