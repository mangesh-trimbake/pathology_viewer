import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import api from "@/utils/backend-api"
import user from './modules/user'
// import users from './modules/users'
import products from './modules/products'
import orders from "./modules/orders";
import customers from "./modules/customers";

import users from './modules/users'
import companies from './modules/companies'
import brands from './modules/brands'
import opportunities from './modules/opportunities'
import entrepreneurships from './modules/entrepreneurships'
Vue.use(Vuex)


export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })], // !debug ? [createPersistedState({ storage: window.sessionStorage })] : [],
  modules: {
    user,
    products,
    orders,
    customers,
    users,
    companies,
    brands,
    opportunities,
    entrepreneurships
  }
})
