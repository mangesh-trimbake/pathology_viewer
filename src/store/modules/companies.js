/* globals Store */

// import api from "@/utils/demo-api";
import api from "@/utils/backend-api";
import {Company, CompanyMaster, Brand} from "@/models";
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
  company: new Company(),
  company_master: new CompanyMaster(),
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
  getCompanyById ({ commit }, id) {

    return new Promise((resolve, reject) => {


      if (id) {
        commit("setLoading", { loading: true });
        api.getData("companies/" + id + "?_expand=category").then(
          res => {
            // const company = res.data;
            // commit("setCompany", { company });

            const response = res.data;
            if (response.success) {
              const company = response.success.data[0];

              company.user = company.user[0]

              commit("setCompany", { company });
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
        commit("setCompany", { company: new Company() });
        resolve()

      }



    })


  },
  getCompanyMasters ({ commit }) {

    commit("setLoading", { loading: true });
    api.getData("companies/masters").then(
      res => {
        const response = res.data;
        if (response.success) {
          const masters = response.success.data;
          commit("setCompanyMasters", { masters });
        }

      },
      err => {
        console.log(err);
      }
    );
    commit("setLoading", { loading: false });

  },
  getAllCompanies ({ commit }) {
    commit("setLoading", { loading: true });
    api.getData("companies").then(res => {
      console.log(res.data.success.data);
      const companies = res.data.success.data;
      companies.forEach(p => {
        // p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, companies);
      commit("setLoading", { loading: false });
    });
  },
  searchCompanies ({ commit }, searchQuery) {
    api.getData("companies?_expand=category&" + searchQuery).then(res => {
      const companies = res.data;
      companies.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, companies);
    });
  },
  quickSearch ({ commit }, { headers, qsFilter, pagination }) {
    // TODO: Following solution should be replaced by DB full-text search for companyion
    api.getData("companies?_expand=category").then(res => {
      const companies = res.data.filter(r =>
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
      companies.forEach(p => {
        p.categoryName = p.category.categoryName;
      });
      commitPagination(commit, companies);
    });
  },
  deleteCompany ({ commit, dispatch }, id) {
    api
      .deleteData("companies/" + id.toString())
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
  saveCompany  ({ commit, dispatch }, company) {
    delete company.category;
    if (!company.id) {
      api
        .postData("companies/add", company)
        .then(res => {
          const company = res.data;
          commit("setCompany", { company });
          sendSuccessNotice(commit, "New company has been added.");
          closeNotice(commit, 1500);
        })
        .catch(err => {
          console.log(err);
          sendErrorNotice(commit, "Operation failed! Please try again later. ");
          closeNotice(commit, 1500);
        });
    } else {
      api
        .postData("companies/update/" + company.id.toString(), company)
        .then(res => {
          const response = res.data;

          const company = response.success.data

          // commit("setCompany", { company });
          sendSuccessNotice(commit, "Company has been updated.");
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
  setItems (state, companies) {
    state.items = companies;
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
  setCompany (state, {company}) {
    state.company = company
  },
  setCompanyMasters (state, {masters}) {
    // state.masters = masters
    state.company_master = masters
  }

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
