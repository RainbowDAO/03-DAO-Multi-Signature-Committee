import getContract from '@/abi/index'
const state={
    token: null
}
const mutations = {
    SET_COIN(state,{coinName,value}){
        state[coinName] = value
    }
}

function judgeToken(rootState, address) {
    console.log(address)
    if (!state.token) state.token = getContract.getContractByToken("token", address, rootState.app.web3)
}

const actions = {
    approve({rootState},{address, contract }){
        judgeToken(rootState,address)
        console.log(contract,address,state.token)
        return new Promise((resolve) => {
            state.token.methods.approve(contract, rootState.app.web3.utils.toWei("10000000000000000000000000000000000000").toString()).send({
                from:rootState.app.account
            }).then(res => {
                resolve(res)
            })
        })
    },
    allowance({rootState},{address, contract }){
        judgeToken(rootState,address)
        return new Promise((resolve) => {
            state.token.methods.allowance(rootState.app.account,contract).call().then(res => {
                resolve(res)
            })
        })
    },
    getPriorVotes({rootState},{address,blockNumber,account}){
        console.log(address,blockNumber,account)
        judgeToken(rootState,address)
        if(!account){
            account = rootState.app.account
        }
        return new Promise((resolve) => {
            state.token.methods.getPriorVotes(account,blockNumber).call({
                from:rootState.app.account
            }).then(res => {
                resolve(res)
            })
        })
    },
    delegateVote({rootState},{address ,delegateNumber, delegateAddress}){
        judgeToken(rootState,address)
        return new Promise((resolve) => {
            state.token.methods.delegateVote(delegateAddress, delegateNumber).send({
                from:rootState.app.account
            }).then(res => {
                resolve(res)
            })
        })
    },
    delegateVotes({rootState},{address,blockNumber}){
        judgeToken(rootState,address)
        console.log(address,blockNumber)
        return new Promise((resolve) => {
            state.token.methods.delegateVotes(rootState.app.account,blockNumber).call({
                from:rootState.app.account
            }).then(res => {
                resolve(res)
            })
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}

