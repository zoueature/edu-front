import axios from 'axios'
import {ElNotification} from "element-plus";

let http = axios.create({
    baseURL: "https://poper-be-interview-01.herokuapp.com/api",
    // baseURL: "http://192.168.31.44:8000/api",
    // baseURL: "/api" // in website
    // headers: {
    //     Authorization : "Bearer " + (localStorage.getItem("access_token") == null ? '' : localStorage.getItem("access_token"))
    // },
})

function rejectHandler(router, store) {
    http.interceptors.request.use(
        config => {
            if (localStorage.getItem("access_token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.Authorization = "Bearer " + localStorage.getItem("access_token")
            }
            return config;
        },
        err => {
            return Promise.reject(err);
        }
    );
    http.interceptors.response.use(
        response => {
            if (response.data.code !== 0) {
                ElNotification({
                    title: "提示",
                    message: response.data.msg,
                })
            }
            return response;
        },
        error => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                    case 403:
                        // 返回 401 清除token信息并跳转到登录页面
                        localStorage.removeItem("access_token")
                        store.commit('setLogout')
                        router.replace({
                            path: '/login',
                            query: {redirect: router.currentRoute.fullPath}
                        })
                        break
                    default:
                        ElNotification({
                            title: "提示",
                            message: "网络错误",
                        })
                }
            }
            return Promise.reject(error.response.data)   // 返回接口返回的错误信息
        }
    );
}


async function get(uri, params, header = {}) {
    let resp = await http.get(uri, {
        params: params,
        headers: header,
    })
    if (resp.status !== 200) {
        return null
    }
    let data = resp.data
    if (data.code !== 0) {
        return null
    }
    return data.data
}

async function post(uri, params, header = {}) {
    let resp = await http.post(uri, params, {headers: header})
    if (resp.status !== 200) {
        return null
    }
    let data = resp.data
    if (data.code !== 0) {
        return null
    }

    return data.data
}

export function uploadFile(url, payload, cancelToken, cd) {
    return http({
        url: url,
        method: "post",
        data: payload,
        onUploadProgress: function(progressEvent) {
            if (progressEvent.lengthComputable) {
                cd(progressEvent);
            }
        },
        cancelToken: cancelToken,
    });
}

export default {
    http,
    get,
    uploadFile,
    post,
    rejectHandler,
}