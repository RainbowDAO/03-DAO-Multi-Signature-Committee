# Getting Started
## **Dependencies**

- Linux , Mac or Windows
- node ≥ 14
- truffle v5.4.22
## test-net-contract

test-network:Rinkeby

### address

#### DaoFactory
0x65583cBC0c452B52f14810e4d2f54959a6F8d9C5
#### ERC20Factory
0x484B849bfF6aEb31dC6a8C7fE7B3ab3e0Fdaa228



## **Installing**

```bash
git clone https://github.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee.git
cd 03-ETHDenver2022-DAO-Multi-Signature-Committee
npm install
```

## **Prepare some ETH**
You may need 1 ~ 3 ETH in your wallet.


## **Compile  Contracts**
```truffle compile```
## **Deploy  Contracts**


You will deploy 2 factory contracts
- ERC20Factory
- DaoFactory

To deploy the contracts,First write your private key in the .secret ,second open truffle-config.js . Then change the defaultNetwork accordingly. Then run ```truffle migrate --network mainnet```
,or deploy on your own network,run ```truffle migrate --network your network```



