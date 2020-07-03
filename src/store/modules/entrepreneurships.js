/* globals Store */

// import api from "@/utils/demo-api";
import api from "@/utils/backend-api";
import {Entrepreneurship, EntrepreneurshipMaster, Company, Brand} from "@/models";
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
  entrepreneurship: new Entrepreneurship(),
  entrepreneurship_master: new EntrepreneurshipMaster(),
  company: new Company(),
  brand: new Brand(),
  categories: [],
  masters: {},
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
  getEntrepreneurshipById ({ commit }, id) {

    return new Promise((resolve, reject) => {

      if (id) {
        commit("setLoading", { loading: true });
        api.getData("entrepreneurships/" + id).then(
          res => {
            const response = res.data;
            if (response.success) {
              const entrepreneurship = response.success.data[0];
              commit("setEntrepreneurship", { entrepreneurship });
              resolve()
            }

          },
          err => {
            console.log(err);
            reject()
          }
        );
        commit("setLoading", { loading: false });
      } else {
        commit("setEntrepreneurship", { entrepreneurship: new Entrepreneurship() });
        resolve()
      }

  })

  },
  getEntrepreneurshipMasters ({ commit }) {

    commit("setLoading", { loading: true });
    api.getData("entrepreneurships/masters").then(
      res => {
        const response = res.data;
        if (response.success) {
          const masters = response.success.data;
          commit("setEntrepreneurshipMasters", { masters });
        }

      },
      err => {
        console.log(err);
      }
    );
    commit("setLoading", { loading: false });

  },
  getAllEntrepreneurships ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("entrepreneurships").then(res => {
      console.log(res.data.success.data);
      const entrepreneurships = res.data.success.data;
      entrepreneurships.forEach(p => {
        // p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, entrepreneurships);
      commit("setLoading", { loading: false });
    });
  },
  searchEntrepreneurships ({ commit }, searchQuery) {
    api.getData("entrepreneurships?_expand=category&" + searchQuery).then(res => {
      const entrepreneurships = res.data;
      entrepreneurships.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, entrepreneurships);
    });
  },
  quickSearch ({ commit }, { headers, qsFilter, pagination }) {
    // TODO: Following solution should be replaced by DB full-text search for entrepreneurshipion
    api.getData("entrepreneurships?_expand=category").then(res => {
      const entrepreneurships = res.data.filter(r =>
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
      entrepreneurships.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, entrepreneurships);
    });
  },
  deleteEntrepreneurship ({ commit, dispatch }, id) {
    api
      .deleteData("entrepreneurships/" + id.toString())
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
  saveEntrepreneurship  ({ commit, dispatch }, entrepreneurship) {
    delete entrepreneurship.category;
    if (!entrepreneurship.id) {
      api
        .postData("entrepreneurships/add", entrepreneurship)
        .then(res => {
          const entrepreneurship = res.data;
          commit("setEntrepreneurship", { entrepreneurship });
          sendSuccessNotice(commit, "New entrepreneurship has been added.");
          closeNotice(commit, 1500);
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    } else {
      api
        .postData("entrepreneurships/update/" + entrepreneurship.id.toString(), entrepreneurship)
        // .postData("entrepreneurships/update/" + entrepreneurship.entrepreneurship_id.toString(), qs.stringify(entrepreneurship))
        .then(res => {
          const entrepreneurship = res.data;
          commit("setEntrepreneurship", { entrepreneurship });
          sendSuccessNotice(commit, "Entrepreneurship has been updated.");
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
  setItems (state, entrepreneurships) {
    state.items = entrepreneurships;
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
  setEntrepreneurship (state, {entrepreneurship}) {
    state.entrepreneurship = entrepreneurship
  },
  setEntrepreneurshipMasters (state, {masters}) {
    // state.masters = masters
    state.entrepreneurship_master = masters
  }

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
