/* globals Store */

// import api from "@/utils/demo-api";
import api from "@/utils/backend-api";
import {Opportunity, OpportunityMaster, Company} from "@/models";
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
  opportunity: new Opportunity(),
  opportunity_master: new OpportunityMaster(),
  company: new Company(),
  categories: [],
  masters: {}
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
  getOpportunityById ({ commit }, id) {

    return new Promise((resolve, reject) => {

      if (id) {
        commit("setLoading", { loading: true });
        api.getData("opportunities/" + id + "?_expand=category").then(
          res => {
            const response = res.data;
            if (response.success) {
              const opportunity = response.success.data[0];
              commit("setOpportunity", { opportunity });
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
        commit("setOpportunity", { opportunity: new Opportunity() });
        resolve()
      }


    })

  },
  getOpportunityMasters ({ commit }) {

    commit("setLoading", { loading: true });
    api.getData("opportunities/masters").then(
      res => {
        const response = res.data;
        if (response.success) {
          const masters = response.success.data;
          commit("setOpportunityMasters", { masters });
        }

      },
      err => {
        console.log(err);
      }
    );
    commit("setLoading", { loading: false });

  },
  getAllOpportunities ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("opportunities").then(res => {
      console.log(res.data.success.data);
      const opportunities = res.data.success.data;
      opportunities.forEach(p => {
        // p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, opportunities);
      commit("setLoading", { loading: false });
    });
  },
  searchOpportunities ({ commit }, searchQuery) {
    api.getData("opportunities?_expand=category&" + searchQuery).then(res => {
      const opportunities = res.data;
      opportunities.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, opportunities);
    });
  },
  quickSearch ({ commit }, { headers, qsFilter, pagination }) {
    // TODO: Following solution should be replaced by DB full-text search for opportunityion
    api.getData("opportunities?_expand=category").then(res => {
      const opportunities = res.data.filter(r =>
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
      opportunities.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, opportunities);
    });
  },
  deleteOpportunity ({ commit, dispatch }, id) {
    api
      .deleteData("opportunities/" + id.toString())
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
  saveOpportunity  ({ commit, dispatch }, opportunity) {
    delete opportunity.category;
    if (!opportunity.id) {
      api
        .postData("opportunities/add", opportunity)
        .then(res => {
          const opportunity = res.data;
          commit("setOpportunity", { opportunity });
          sendSuccessNotice(commit, "New opportunity has been added.");
          closeNotice(commit, 1500);
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    } else {
      api
        .postData("opportunities/update/" + opportunity.id.toString(), opportunity)
        // .postData("opportunities/update/" + opportunity.opportunity_id.toString(), qs.stringify(opportunity))
        .then(res => {
          const opportunity = res.data;
          // commit("setOpportunity", { opportunity });
          sendSuccessNotice(commit, "Opportunity has been updated.");
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
  setItems (state, opportunities) {
    state.items = opportunities;
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
  setOpportunity (state, {opportunity}) {
    state.opportunity = opportunity
  },
  setOpportunityMasters (state, {masters}) {
    // state.masters = masters
    state.opportunity_master = masters
  }

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
