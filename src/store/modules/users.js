/* globals Store */

// import api from "@/utils/demo-api";
import Vue from 'vue'
import api from "@/utils/backend-api";
import {User, UserMaster, Company, Brand} from "@/models";
const qs = require('querystring')
import {
  sendSuccessNotice,
  sendErrorNotice,
  closeNotice,
  getDefaultPagination,
  commitPagination
} from "@/utils/store-util.js";
import {get} from "lodash"

const state = {
  items: [],
  pagination: getDefaultPagination(),
  loading: false,
  mode: "",
  snackbar: false,
  notice: "",
  user: new User(),
  user_master: new UserMaster(),
  company: new Company(),
  brand: new Brand(),
  categories: [],
  // masters: {},
};

const getters = {
};

const actions = {
  getCategories ({ commit }) {
    api.getData("categories/").then(res => {
      const categories = [];
      res.data.forEach(c => {
        const category = { ...c };
        category.text = c.categoryName;
        category.value = c.id;
        categories.push(category);
      });
      commit("setCategories", categories);
    });
  },
  getUserById ({ commit }, id) {
    if (id) {
      commit("setLoading", { loading: true });
      api.getData("users/" + id + "?_expand=category").then(
        res => {
          const response = res.data;
          if (response.success) {
            const user = response.success.data[0];
            user.city = user.city[0]
            commit("setUser", { user });
            console.log(state.user_master);
            // state.user_master.cities = user.city
            // state.user_master = Object.assign({}, state.user_master.cities, user.city)
            // state.user_master = Object.assign(state.user_master.cities, "cities", user.city)
            Vue.set(state.user_master, 'cities', user.city);

            console.log(user.city);
            console.log(state.user_master);
          }

        },
        err => {
          console.log(err);
        }
      );
      commit("setLoading", { loading: false });
    } else {
      commit("setUser", { user: new User() });
    }
  },
  getUserMasters ({ commit }) {
    console.log("inside getUserMasters");
    commit("setLoading", { loading: true });
    api.getData("users/masters").then(
      res => {
        const response = res.data;
        if (response.success) {
          const masters = response.success.data;
          console.log(masters);
          commit("setUserMasters", { masters });
        }

      },
      err => {
        console.log(err);
      }
    );
    commit("setLoading", { loading: false });

  },
  getAllUsers ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("users").then(res => {
      console.log(res.data.success.data);
      const users = res.data.success.data;
      users.forEach(p => {
        // p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, users);
      commit("setLoading", { loading: false });
    });
  },
  searchUsers ({ commit }, searchQuery) {
    api.getData("users?_expand=category&" + searchQuery).then(res => {
      const users = res.data;
      users.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, users);
    });
  },
  quickSearch ({ commit }, { headers, qsFilter, pagination }) {
    // TODO: Following solution should be replaced by DB full-text search for userion
    api.getData("users?_expand=category").then(res => {
      const users = res.data.filter(r =>
        headers.some(header => {
          const val = get(r, [header.value]);
          return (
            (val &&
              val
                .toString()
                .toLowerCase()
                .includes(qsFilter)) ||
            false
          );
        })
      );
      users.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, users);
    });
  },
  deleteUser ({ commit, dispatch }, id) {
    api
      .deleteData("users/" + id.toString())
      .then(res => {
        return new Promise((resolve, reject) => {
          sendSuccessNotice(commit, "Operation is done.");
          resolve();
        });
      })
      .catch(err => {
        console.log(err);
        sendErrorNotice(commit, "Operation failed! Please try again later. ");
        closeNotice(commit, 1500);
      });
  },
  saveUser  ({ commit, dispatch }, user) {
    delete user.category;
    if (!user.user_id) {
      api
        .postData("users/add", user)
        .then(res => {
          const user = res.data;
          commit("setUser", { user });
          sendSuccessNotice(commit, "New user has been added.");
          closeNotice(commit, 1500);
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    } else {
      api
        .postData("users/update/" + user.user_id.toString(), user)
        // .postData("users/update/" + user.user_id.toString(), qs.stringify(user))
        .then(res => {
          const response = res.data;
          console.log(response);
          const user = response.success.data
          console.log(user);
          // commit("setUser", { user });
          sendSuccessNotice(commit, "User has been updated.");
          closeNotice(commit, 1500);
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    }
  },
  closeSnackBar ({ commit }, timeout) {
    closeNotice(commit, timeout);
  },
};

const mutations = {
  setCategories (state, categories) {
    state.categories = categories;
  },
  setItems (state, users) {
    state.items = users;
  },
  setPagination (state, pagination) {
    state.pagination = pagination;
  },
  setLoading (state, { loading }) {
    state.loading = loading;
  },
  setNotice (state, { notice }) {
    console.log(" notice .... ", notice);
    state.notice = notice;
  },
  setSnackbar (state, { snackbar }) {
    state.snackbar = snackbar;
  },
  setMode (state, { mode }) {
    state.mode = mode;
  },
  setUser (state, {user}) {
    console.log("user", user);
    state.user = user
  },
  setUserMasters (state, {masters}) {
    console.log(masters);
    // state.masters = masters;
    state.user_master = masters;
    console.log(state.user_master);
  },

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
