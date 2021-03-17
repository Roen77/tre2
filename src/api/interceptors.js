import store from '../store/index';

const setinterceptor=(instance)=>{
    // Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.authorization=`Bearer ${store.state.token}`
    console.log('이제 api 호출할때마다 헤더에 토근정보가 같이 보내진다')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  return instance;
}

export default setinterceptor;