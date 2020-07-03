/* globals Store */

// import api from "@/utils/demo-api";
import api from "@/utils/backend-api";
import {Brand, BrandMaster, Company} from "@/models";
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
  brand: new Brand(),
  brand_master: new BrandMaster(),
  company: new Company(),
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
  getBrandById ({ commit }, id) {
    if (id) {
      commit("setLoading", { loading: true });
      api.getData("brands/" + id + "?_expand=category").then(
        res => {
          const response = res.data;
          if (response.success) {
            const brand = response.success.data[0];

            brand.company = brand.company[0]

            commit("setBrand", { brand });
          }

        },
        err => {
          console.log(err);
        }
      );
      commit("setLoading", { loading: false });
    } else {
      commit("setBrand", { brand: new Brand() });
    }
  },
  getBrandMasters ({ commit }) {

    commit("setLoading", { loading: true });
    api.getData("brands/masters").then(
      res => {
        const response = res.data;
        if (response.success) {
          const masters = response.success.data;
          commit("setBrandMasters", { masters });
        }

      },
      err => {
        console.log(err);
      }
    );
    commit("setLoading", { loading: false });

  },
  getAllBrands ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("brands").then(res => {
      console.log(res.data.success.data);
      const brands = res.data.success.data;
      brands.forEach(p => {
        // p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, brands);
      commit("setLoading", { loading: false });
    });
  },
  searchBrands ({ commit }, searchQuery) {
    api.getData("brands?_expand=category&" + searchQuery).then(res => {
      const brands = res.data;
      brands.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, brands);
    });
  },
  quickSearch ({ commit }, { headers, qsFilter, pagination }) {
    // TODO: Following solution should be replaced by DB full-text search for brandion
    api.getData("brands?_expand=category").then(res => {
      const brands = res.data.filter(r =>
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
      brands.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, brands);
    });
  },
  deleteBrand ({ commit, dispatch }, id) {
    api
      .deleteData("brands/" + id.toString())
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
  saveBrand  ({ commit, dispatch }, brand) {
    delete brand.category;
    if (!brand.id) {
      api
        .postData("brands/add", brand)
        .then(res => {
          const brand = res.data;
          commit("setBrand", { brand });
          sendSuccessNotice(commit, "New brand has been added.");
          closeNotice(commit, 1500);
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    } else {
      api
        .postData("brands/update/" + brand.id.toString(), brand)
        // .postData("brands/update/" + brand.brand_id.toString(), qs.stringify(brand))
        .then(res => {
          const brand = res.data;
          // commit("setBrand", { brand });
          sendSuccessNotice(commit, "Brand has been updated.");
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
  setItems (state, brands) {
    state.items = brands;
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
  setBrand (state, {brand}) {
    state.brand = brand
  },
  setBrandMasters (state, {masters}) {
    // state.masters = masters
    state.brand_master = masters
  }

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
