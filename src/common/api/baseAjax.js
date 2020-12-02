import Axios from "./baseAxios";
let Ajax = Axios();
export default {
    get(url, params, headers) {
        let options = {};
        if(params) options.params = params;
        if(headers) options.headers = headers;
        return Ajax.get(url, options);
    },
    post(url, params, headers) {
        let options = {};
        if(headers) options.headers = headers;
        return Ajax.post(url, params, options);
    },
    put(url, params, headers) {
        let options = {};
        if(headers) options.headers = headers;
        return Ajax.put(url, params, options);
    },
    delete(url, params) {
        let options = null;
        // if (params) options.params = params;
        // return Ajax.delete(url, options);
        if(params) {
            options = url + params.id;
            return Ajax.delete(options);
        }
    }
}