import axios from 'axios'


// 测试数据库
// axios.defaults.baseURL = "http://192.168.1.25:8080"
axios.defaults.baseURL = "http://47.106.71.3:8080"

// axios.defaults.timeout = 2500;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {

  // 对响应数据做点什么
  localStorage.setItem(response.config.url, JSON.stringify(response))
  return response;
}, function (error) {
  // 对响应错误做点什么
  // console.log(error)
  // console.log(locationUrl)
  // return Promise.reject(error);
  // return localStorage.getItem(locationUrl)
  // console.log(JSON.parse(localStorage.getItem(error.config.url)))
  return JSON.parse(localStorage.getItem(error.config.url))
});


export default axios
