import ERC20Factory from "./data/erc20Factory.json"
import DAOFactory from "./data/DAOFactory.json"
import GovernanceDao from "./data/GovernanceDao.json"
import token from "./data/token.json";
const CONTRACTS = {
    ERC20Factory:{address:"0x20613AbF20ab1Fb3eE2200471E02A6fafCbddc84",abi:ERC20Factory},
    DAOFactory:{address:"0x829C1A191f33C02a92711665c4348c7d933E757A",abi:DAOFactory},
    GovernanceDao:{abi:GovernanceDao},
    token:{abi:token}
};

function getContractByName(name, web3) {
    return new web3.eth.Contract(CONTRACTS[name].abi, CONTRACTS[name].address, {});
}

function getContractByToken(name, address, web3) {
    return new web3.eth.Contract(CONTRACTS[name].abi, address, {});
}

function getContractAddress(name) {
    return CONTRACTS[name].address;
}

export default {
    CONTRACTS,
    getContractByName,
    getContractByToken,
    getContractAddress
};
