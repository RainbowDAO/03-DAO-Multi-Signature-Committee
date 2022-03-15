import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from "./app";


import erc20Factory from "./modules/erc20Factory";
import daoFactory from "./modules/daoFactory";
import governanceDao from "./modules/governanceDao";
import token from "./modules/token";
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {

        app,
        erc20Factory,
        daoFactory,
        governanceDao,
        token
    },
    getters
})

export default store
