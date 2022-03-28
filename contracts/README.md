# Getting Started
## **Dependencies**

- Linux , Mac or Windows
- node ≥ 14
- truffle v5.4.22
## test-net-contract

test-network:BNB TEST

### address

#### DaoFactory
0x7CBA17696eEE9c3d1feC11f67925a4e684c095B3
#### ERC20Factory
0x9CfaEACa4eD6CE4700A5aF4Dfc214E02c2DbE323



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



