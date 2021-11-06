import axios from 'axios'
import CryptoJS from 'crypto-js'
import { Toast } from 'antd-mobile'
const Axios = axios.create({
    baseURL: '/api',
    timeout: 1000000000000,
    responseType: "json",
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        'access-control-allow-headers': '*'
    }
});
Axios.interceptors.request.use(config => {
    Toast.loading('Loading...', 0)
    let timestamp = new Date().getTime() + 5000001
    let path = encodeURI(config.url + timestamp)
    let hash = CryptoJS.HmacSHA256(path, 'secret')
    let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    console.log('path:', path);
    console.log('timestamp:', timestamp);
    console.log('digest:', hashInBase64);
    config.headers = {
        'access-key': 'client1',
        'sk': 'secret',
        timestamp,
        'digest': hashInBase64
    }
    return config;

}, error => {  //请求错误处理

    Promise.reject(error)
});

Axios.interceptors.response.use(function (res) {
    // 返回响应时做一些处理
    Toast.hide()
    if (res.data.code == 200) {
        return res.data;
    } else if (res.data.code == 400) {
        return Promise.reject(res.data);
    } else {
        return Promise.reject(res.data);
    }

}, function (error) {
    // 当响应异常时做一些处理
    return Promise.reject(error)

});



export default Axios

