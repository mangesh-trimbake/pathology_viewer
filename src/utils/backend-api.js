import axios from 'axios'

// axios.defaults.headers.common = {
//   ...axios.defaults.headers.common,
//   'Access-Control-Allow-Origin': '*',
//   "Content-Type": 'application/json, */*',
//   // "Authorization": token ? `Token ${token}` : undefined
// }
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded, */*';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded, */*';
// axios.defaults.preflightContinue = false;
//
// axios.defaults.crossDomain = true;
   // axios.defaults.withCredentials = !!token;



const BASE_URL = 'http://localhost:8081/'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: false,
  params: {}
})




// Add a request interceptor
instance.interceptors.request.use(function (config) {
  /* global window Store */
  // const {token} = Store.state.user
  // console.log("token", token)
  // if (true) {
  //   // config.headers.common['Authorization'] = 'Bearer ' + token
  //   // config.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080'
  // } else {
  //   // Use application/x-www-form-urlencoded for login
  //   // config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
  // }
  // config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
  // config.headers.common['Cache-Control'] = 'no-cache'
  // config.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080'
  // config.headers.common['Content-Type'] = 'application/json,text/plain, */*'
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})




instance.interceptors.response.use((response) => response, (error) => {
  console.log(error.config)
  return Promise.reject(error)
})

// getFormData (item) {
//   var formData = new FormData()
//   for ( var key in item ) {
//       formData.append(key, item[key]);
//   }
//   return formData
// }

export default {
  getData (action) {
    let url = `${BASE_URL}`
    url += action
    return instance.get(url)
  },
  getDataOther (url) {
    return instance.get(url)
  },
  postData (action, data) {
    var formData = new FormData()
    for ( var key in data ) {
        formData.append(key, data[key]);
    }
    // data = getFormData(data)
    data = formData
    let url = `${BASE_URL}`
    url += action
    return instance.post(url, data)
  },
  postDataOther (url, data) {
    return instance.post(url, data)
  },
  putData (action, data) {
    // data = getFormData(data)
    let url = `${BASE_URL}`
    url += action
    return instance.put(url, data)
  },
  deleteData (action) {
    let url = `${BASE_URL}`
    url += action
    return instance.delete(url)
  },
  login (action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.get(url, data)
  },

}
