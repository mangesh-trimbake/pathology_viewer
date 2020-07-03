import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/components/404'

import Dashboard from '@/pages/Dashboard'
import OrderList from '@/pages/OrderList'
import OrderForm from '@/pages/OrderForm'
import About from '@/pages/About'
import CustomerList from '@/pages/CustomerList'
import CustomerForm from '@/pages/CustomerForm'
import Products from '@/pages/ProductList'
import ProductForm from '@/pages/ProductForm'

import Login from '@/components/Login'
import ChangePassword from '@/components/ChangePassword'


import Users from '@/pages/Users'
import UserForm from '@/pages/UserForm'

import Companies from '@/pages/Companies'
import CompanyForm from '@/pages/CompanyForm'

import Brands from '@/pages/Brands'
import BrandForm from '@/pages/BrandForm'

import Opportunities from '@/pages/Opportunities'
import OpportunityForm from '@/pages/OpportunityForm'

import Entrepreneurships from '@/pages/Entrepreneurships'
import EntrepreneurshipForm from '@/pages/EntrepreneurshipForm'
//
// import Countries from '@/pages/Countries'
// import CountryForm from '@/pages/CountryForm'
//
// import States from '@/pages/States'
// import Cities from '@/pages/Cities'
// import Industries from '@/pages/Industries'
// import SubIndustries from '@/pages/SubIndustries'
//
// import BusinessTypes from '@/pages/BusinessTypes'
// import BusinessTypeForm from '@/pages/BusinessTypeForm'
//
// import BusinessSub1Types from '@/pages/BusinessSub1Types'
// import BusinessSub1TypeForm from '@/pages/BusinessSub1TypeForm'
//
// import BusinessSub2Types from '@/pages/BusinessSub2Types'
// import BusinessSub2TypeForm from '@/pages/BusinessSub2TypeForm'
//
// import TotalInvestmentRanges from '@/pages/TotalInvestmentRanges'
// import AssociationFeeRanges from '@/pages/AssociationFeeRanges'
// import AssociationFeeTypes from '@/pages/AssociationFeeTypes'
// import AreaTypes from '@/pages/AreaTypes'
// import AreaRequiredRanges from '@/pages/AreaRequiredRanges'
// import FitOutCostRanges from '@/pages/FitOutCostRanges'
// import Cities from '@/pages/Cities'
// import Cities from '@/pages/Cities'
// import Cities from '@/pages/Cities'
// import Cities from '@/pages/Cities'
// import Cities from '@/pages/Cities'


import PathologyImages from '@/pages/PathologyImages'
// import UserForm from '@/pages/UserForm'

Vue.use(Router)

import auth from '@/utils/auth'

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

// const debug = process.env.NODE_ENV !== 'production'

export default new Router({
  base: __dirname,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/404', component: ErrorPage, name: 'ErrorPage' },
    { path: '/dashboard', component: Dashboard, name: 'Dashboard', beforeEnter: requireAuth },
    { path: '/about', component: About, name: 'About', beforeEnter: requireAuth },
    { path: '/orders', component: OrderList, name: 'Orders', beforeEnter: requireAuth },
    { path: '/neworder', component: OrderForm, name: 'NewOrder', beforeEnter: requireAuth },
    { path: '/order/:id', component: OrderForm, name: 'Order', beforeEnter: requireAuth },
    { path: '/customers', component: CustomerList, name: 'Customers', beforeEnter: requireAuth },
    { path: '/newcustomer', component: CustomerForm, name: 'NewCustomer', beforeEnter: requireAuth },
    { path: '/customer/:id', component: CustomerForm, name: 'Customer', beforeEnter: requireAuth },
    { path: '/product/:id', component: ProductForm, name: 'Product', beforeEnter: requireAuth },
    { path: '/products', component: Products, name: 'Products', beforeEnter: requireAuth },
    { path: '/newproduct', component: ProductForm, name: 'NewProduct', beforeEnter: requireAuth },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/changePassword', component: ChangePassword, name: 'ChangePassword' },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/login')
      }
    },



    { path: '/users', component: Users, name: 'Users', beforeEnter: requireAuth },
    { path: '/users/add', component: UserForm, name: 'NewUser', beforeEnter: requireAuth },
    { path: '/users/view/:id', component: UserForm, name: 'User', beforeEnter: requireAuth },

    { path: '/companies', component: Companies, name: 'Companies', beforeEnter: requireAuth },
    { path: '/companies/add', component: CompanyForm, name: 'NewCompany', beforeEnter: requireAuth },
    { path: '/companies/view/:id', component: CompanyForm, name: 'Company', beforeEnter: requireAuth },

    { path: '/brands', component: Brands, name: 'Brands', beforeEnter: requireAuth },
    { path: '/brands/add', component: BrandForm, name: 'NewBrand', beforeEnter: requireAuth },
    { path: '/brands/view/:id', component: BrandForm, name: 'Brand', beforeEnter: requireAuth },

    { path: '/opportunities', component: Opportunities, name: 'Opportunities', beforeEnter: requireAuth },
    { path: '/Opportunities/add', component: OpportunityForm, name: 'NewOpportunity', beforeEnter: requireAuth },
    { path: '/Opportunities/view/:id', component: OpportunityForm, name: 'Opportunity', beforeEnter: requireAuth },

    { path: '/entrepreneurships', component: Entrepreneurships, name: 'Entrepreneurships', beforeEnter: requireAuth },
    { path: '/entrepreneurships/add', component: EntrepreneurshipForm, name: 'NewEntrepreneurship', beforeEnter: requireAuth },
    { path: '/entrepreneurships/view/:id', component: EntrepreneurshipForm, name: 'Entrepreneurship', beforeEnter: requireAuth },

    // { path: '/entrepreneurships', component: Entrepreneurships, name: 'Entrepreneurships', beforeEnter: requireAuth },
    // { path: '/entrepreneurships/add', component: EntrepreneurshipForm, name: 'EntrepreneurshipForm', beforeEnter: requireAuth },
    // { path: '/entrepreneurships/view/:id', component: EntrepreneurshipForm, name: 'EntrepreneurshipForm', beforeEnter: requireAuth },
    //
    //
    // { path: '/countries', component: Countries, name: 'Countries', beforeEnter: requireAuth },
    // { path: '/countries/add', component: CountryForm, name: 'CountryForm', beforeEnter: requireAuth },
    // { path: '/countries/view/:id', component: CountryForm, name: 'CountryForm', beforeEnter: requireAuth },
    //
    // { path: '/business-types', component: BusinessTypes, name: 'BusinessTypes', beforeEnter: requireAuth },
    // { path: '/business-types/add', component: BusinessTypeForm, name: 'BusinessTypeForm', beforeEnter: requireAuth },
    // { path: '/business-types/view/:id', component: BusinessTypeForm, name: 'BusinessTypeForm', beforeEnter: requireAuth },
    //
    // { path: '/business-sub1-types', component: BusinessSub1Types, name: 'BusinessSub1Types', beforeEnter: requireAuth },
    // { path: '/business-sub1-types/add', component: BusinessSub1TypeForm, name: 'BusinessSub1TypeForm', beforeEnter: requireAuth },
    // { path: '/business-sub1-types/view/:id', component: BusinessSub1TypeForm, name: 'BusinessSub1TypeForm', beforeEnter: requireAuth },
    //
    // { path: '/business-sub2-types', component: BusinessSub2Types, name: 'BusinessSub2Types', beforeEnter: requireAuth },
    // { path: '/business-sub2-types/add', component: BusinessSub2TypeForm, name: 'BusinessSub2TypeForm', beforeEnter: requireAuth },
    // { path: '/business-sub2-types/view/:id', component: BusinessSub2TypeForm, name: 'BusinessSub2TypeForm', beforeEnter: requireAuth },

    // { path: '/entrepreneurships', component: Entrepreneurships, name: 'Entrepreneurships', beforeEnter: requireAuth },
    // { path: '/entrepreneurships/add', component: EntrepreneurshipForm, name: 'EntrepreneurshipForm', beforeEnter: requireAuth },
    // { path: '/entrepreneurships/view/:id', component: EntrepreneurshipForm, name: 'OpportunityForm', beforeEnter: requireAuth },
    //
    // { path: '/entrepreneurships', component: Entrepreneurships, name: 'Entrepreneurships', beforeEnter: requireAuth },
    // { path: '/entrepreneurships/add', component: EntrepreneurshipForm, name: 'EntrepreneurshipForm', beforeEnter: requireAuth },
    // { path: '/entrepreneurships/view/:id', component: EntrepreneurshipForm, name: 'OpportunityForm', beforeEnter: requireAuth },

    { path: '/pathology-images', component: PathologyImages, name: 'PathologyImages', beforeEnter: requireAuth },
    // { path: '/users/add', component: UserForm, name: 'NewUser', beforeEnter: requireAuth },
    // { path: '/users/view/:id', component: UserForm, name: 'User', beforeEnter: requireAuth },

    { path: '/', redirect: '/pathology-images' },
    { path: '*', redirect: '/404' },


  ],
  meta: {
    progress: {
      func: [
        {call: 'color', modifier: 'temp', argument: '#ffb000'},
        {call: 'fail', modifier: 'temp', argument: '#6e0000'},
        {call: 'location', modifier: 'temp', argument: 'top'},
        {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
      ]
    }
  }
})
