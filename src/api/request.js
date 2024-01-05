import axios from 'axios'

export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://43.138.145.52/',
        timeout: 5000
    })
    // 2.axios的拦截器
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log('请求拦截错误:', err)
        return Promise.reject(err)
    })

    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        if (err.response) {
            console.log('请求失败');
        } else {
            console.log('网络错误');
        }
    })

    // 3.发送真正的网络请求
    return instance(config)
}
