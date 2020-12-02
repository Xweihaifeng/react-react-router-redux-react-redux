import axios from "axios";
import Request from '@/api/main.js';
// 创建 axios 实例
let service = axios.create({
    timeout: 50000
});

// 设置 post、put 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.put['Content-Type'] = 'application/json'

// 拦截request,设置全局请求为ajax请求
service.interceptors.request.use(
    request => {
        let token = sessionStorage.getItem("token");
        if(token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    err => {
        return Promise.reject(err);
    }
);

// 拦截响应response，并做一些错误处理
service.interceptors.response.use(
    response => {
        return response.data
    },
    err => { // 这里是返回状态码不为200时候的错误处理
        if(err && err.response) {
            switch(err.response.status) {
                case 400:
                    err.message = "请求错误";
                    break;
                case 401:
                    err.message = "未授权，请登录";
                    break;
                case 403:
                    err.message = "拒绝访问";
                    break;
                case 404:
                    err.message = `请求地址出错: ${err.response.config.url}`;
                    break;
                case 405:
                    err.message = "请求方法未允许";
                    break;
                case 408:
                    err.message = "请求超时";
                    break;
                case 500:
                    err.message = "服务器内部错误";
                    break;
                case 501:
                    err.message = "服务未实现";
                    break;
                case 502:
                    err.message = "网关错误";
                    break;
                case 503:
                    err.message = "服务不可用";
                    break;
                case 504:
                    err.message = "网关超时";
                    break;
                case 505:
                    err.message = "HTTP版本不受支持";
                    break;
                default:
                    err.message = `连接错误${err.response.status}`;
            }
        } else { // 跨域获取不到状态码或者其他状态码经行处阿狸
            err.message = "网络出现问题，请稍后重试";
        }

        return Promise.reject(err.msg)
    }
);

export default function() {
    return service
}