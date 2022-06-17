# dydx flashloan and arbitrage

- this works on kovan network (42)

# try flashloan

1. copy .env.example to .env and set configuration
1. your wallet has more than 2 wei
1. just run `npx hardhat run --network kovan scripts/flashloan.ts`
1. you can see log at console

# try flashloan arbitrage

- run `npx hardhat run --network kovan scripts/flashloan_arbitrage.ts`

```

start to deploy
FlashLoan deployed to: 0xFB5cfA4DBcF456253a7F378d093C5f9835914e7C
start dapp
repay: 1000000000000000002
before balance: 1000000000000000000
after 1 balance: 0
after 2 balance: 1153822185231551391
profit: 153822185231551389
0x0971b044ab9efe8381b6c7ee10d8bba091380599657409ccdc308c457dc049f6

```

- [log](https://kovan.etherscan.io/tx/0x0971b044ab9efe8381b6c7ee10d8bba091380599657409ccdc308c457dc049f6)
