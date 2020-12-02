import { point, polygon, booleanPointInPolygon, rhumbDistance } from "@turf/turf";
import { map2Url, map3Url } from "@/api/baseUrl";
const px = 12;
class Unit {
    setItem = (a, b) => sessionStorage.setItem(a, JSON.stringify(b)); // 设置sessionStorage

    getItem = o => JSON.parse(sessionStorage.getItem(o)); // 获取sessionStorage

    setImg = o => process.env.BASE_URL + o; // 获取sessionStorage

    Sum = array => {
        // 数字数组求和
        if(array.length <= 0) return 0;
        var sum = array.map(Number).reduce((prev, cur) => prev + cur);
        return sum;
    };

    unique = o => Array.from(new Set(o)).filter(x => x); // 数组去重

    isArray = o => Object.prototype.toString.call(o) == "[object Array]"; // 按断是否为数组

    isObject = o => Object.prototype.toString.call(o) == "[object Object]"; // 按断是否为对象

    timers = o => (!o ? new Date().getFullYear() : o.getFullYear()); // 获取当前年份

    s = (a, b) => a.map((m, n) => parseFloat(m) - parseFloat(b[n])); // 两数组对应相减后排序

    c = (a, b) => a.map((m, n) => (m ? b[n] / m : 0).toFixed(2)); // 两数组对应整除 (除数不为0 | 保留2位小数)

    currYear = o => (o ? o : new Date().getFullYear()); // 当前年

    Concat = (arr=[], boolean, len=2, spl=[]) => {
        // boolean为true截取数组头部len长度插入尾部，boolean为false截取尾部len长度插入头部
        if(boolean) {
            spl = arr.splice(0, len);
            arr = [...arr, ...spl];
        } else {
            spl = arr.splice(-len);
            arr = [...spl, ...arr];
        }
        return arr;
    };

    randomArray = (a, b = 4) => {
        // 输入总值啊,生成长度b的随机数组
        var values = [];
        var newArr = (arr) => arr.sort(() => (Math.random() - 0.5));
        for(var i = 0; i < b; i++) {
            if(i == b - 1) {
                values[i] = a;
                return newArr(values);
            }
            var value = Math.floor(Math.random() * (a / (b - i)));
            values[i] = value;
            a = a - value;
        }
    };

    random = (m, n, L) => {
        // 生成m~n之间长度为L的随机数组
        let arr = [];
        var random = function(lower, upper) {
            return Math.floor(Math.random() * (upper - lower + 1)) + lower;
        };
        if(L) {
            for(var i = 0; i < L; i++) {
                arr.push(random(m, n));
            }
            return arr;
        } else {
            return random(m, n);
        }
    };

    randomColor = n => {
        // 随机颜色
        var len = Object.keys(Array(n).toString().split(","));
        if(!n) return("#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6));
        else return len.map(() => "#" + ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6));
    };

    getUrlParam = (key, defaultValue = '') => {
        // 通过摄入浏览器地址栏pathname的key查询value
        var pageUrl = window.location.search.substring(1);
        var pairs = pageUrl.split('&');
        for(var i = 0; i < pairs.length; i++) {
            var keyAndValue = pairs[i].split('=');
            if(keyAndValue[0] === key) {
                return keyAndValue[1];
            }
        }
        return defaultValue;
    };

    parseParams = (data) => {
        // json生成浏览器地址栏属性
        try {
            var tempArr = [];
            for(var i in data) {
                var key = encodeURIComponent(i);
                var value = encodeURIComponent(data[i]);
                tempArr.push(key + '=' + value);
            }
            var urlParamsStr = tempArr.join('&');
            return urlParamsStr;
        } catch(err) {
            return '';
        }
    };

    getParams = (url) => {
        // 通过浏览器全路径生成属性对象
        try {
            var index = url.indexOf('?');
            url = url.match(/\?([^#]+)/)[1];
            var obj = {},
                arr = url.split('&');
            for(var i = 0; i < arr.length; i++) {
                var subArr = arr[i].split('=');
                var key = decodeURIComponent(subArr[0]);
                var value = decodeURIComponent(subArr[1]);
                obj[key] = value;
            }
            return obj;
        } catch(err) {
            return null;
        }
    };

    paint = (a, b, c) => a.map(v => {
        return {
            "type": "Feature",
            "properties": {
                "icon": c,
                "name": b,
                "description": v.name,
                "pointX": v.long,
                "pointY": v.lat
            },
            "geometry": {
                "type": "Point",
                "coordinates": [v.long, v.lat]
            }
        }
    });

    coord = (a, b) => {
        // 随机经纬度点
        let X = [];
        for(let i = 0; i < b; i++) {
            var Y = a.split(",").map(v => parseFloat(v) + this.random(-9999999999, 9999999999) / Math.pow(10, 12));
            X.push(Y);
        }
        return X;
    };

    coordArr = (a, b) => {
        // 随机经纬度点
        let X = [];
        for(let i = 0; i < b; i++) {
            var Y = a.split(",").map(v => parseFloat(v) + this.random(-9999999999, 9999999999) / Math.pow(10, 12));
            X.push({
                x: Y[0],
                y: Y[1],
                value: this.random(10, 100)
            });
        }
        return X;
    };

    center = () => {
        // 地图默认中心点/级别
        return {
            zoom: 10,
            minzoom: 10,
            maxzoom: 17,
            rotation: 0,
            center: [116.1766017973423, 39.735209941864014],
            extent: [
                115.97332215218042,
                39.56875874817189,
                116.60503601936792,
                40.14279439270314
            ],
            D2URL: map2Url + 'iserver/services/map-LiangXiang/rest/maps/LXMAP_DITU',
            D3URL: map3Url + 'iserver/services/3D-build_school_big15/rest/realspace',

            new_D2URL: map2Url +'iserver/services/map-LiangXiang-2/rest/maps/LXMAP_DITU1',
            new_D3URL: map3Url +'iserver/services/3D-build_common_big/rest/realspace',
        };
    };

    createPoint = (location, properties) => {
        // 创建点geojson
        let res = point(location, properties);
        return res;
    };

    inArea = (lngLat, bbox) => {
        // 判断点[lng, Lat]是否在面内，bbox为[minX, minY, maxX, maxY]
        let res = booleanPointInPolygon(point(lngLat), polygon(bbox));
        return res;
    };

    isDistance = (a, b) => {
        // 计算两点之间二点距离
        var from = point(a);
        var to = point(b);
        var options = {
            units: 'meters'
        };
        var distance = rhumbDistance(from, to, options);
        return distance;
    };

    getMax = (n, m) => {
        // 两个数之比 (求取最大公约数,用当前数除最大公约数,获得两数的占比)
        var min = n;
        m < n && (min = m);
        var max = 0;
        for(var i = 0, arr = []; i <= min; i++) {
            if(n % i == 0 && m % i == 0) {
                arr.push(i);
            }
        }
        for(var j = 0; j < arr.length; j++) {
            if(arr[j] > arr[j + 1]) {
                arr[j] = [arr[j + 1], (arr[j + 1] = arr[j])][0];
            }
        }
        max = arr[arr.length - 1];
        return [n / max, m / max];
    };

    getFormatDate = (m, n) => {
        // 当前时间的现实格式(YYYY-MM-DD)
        var u = ":";
        var v = "-";
        var w = "";
        var YY = m.getFullYear();
        var MM = m.getMonth() + 1;
        var DD = m.getDate();
        var hh = m.getHours();
        var mm = m.getMinutes();
        var ss = m.getSeconds();
        var ff = new Date(YY, MM, 1).getDate();
        var ee = new Date(YY, MM, 0).getDate();
        if(MM >= 1 && MM <= 9) MM = "0" + MM;
        if(DD >= 0 && DD <= 9) DD = "0" + DD;
        if(hh >= 0 && hh <= 9) hh = " 0" + hh;
        else hh = " " + hh;
        if(mm >= 0 && mm <= 9) mm = "0" + mm;
        if(ss >= 0 && ss <= 9) ss = "0" + ss;
        if(n == "d") w = hh + u + mm + u + ss;
        if(n == "d0") w = " 00:00:00";
        if(n == "d1") w = " 23:59:59";
        if(n == "m0") DD = (ff >= 1 && ff <= 9 ? "0" + ff : ff);
        if(n == "m1") DD = (ee >= 1 && ee <= 9 ? "0" + ee : ee);
        if(n == "dm0") {DD = (ff >= 1 && ff <= 9 ? "0" + ff : ff); w = " 00:00:00"}
        if(n == "dm1") {DD = (ee >= 1 && ee <= 9 ? "0" + ee : ee); w = " 23:59:59"}
        var currentdate = YY + v + MM + v + DD + w;
        return currentdate;
    };

    myBrowser = () => {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("Trident") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
        if(isIE) return "IE";
        if(isOpera) return "Opera";
        if(isEdge) return "Edge";
        if(isFF) return "FF";
        if(isSafari) return "Safari";
        if(isChrome) return "Chrome";
    };

    uuid = (len = 36, radix) => {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };

    tooltip = (o, l) => {
        // 出表移入Echarts,显示信息弹窗
        var body = {
            trigger: o ? "item" : "axis",
            confine: true,
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: !isNaN(l) ? "shadow" : "line", // 默认为直线，可选为：'line' | 'shadow' | 'cross'
                lineStyle: {
                    color: "#07b5ff"
                }
            },
            textStyle: {
                width: px * 3,
                height: px * 3,
                fontSize: px,
                align: "left"
            },
            backgroundColor: "rgba(0,0,0,0.7)", // 背景
            padding: [px * 0.5, px * 0.5], //内边距
            extraCssText: "box-shadow: 0 0 30px 1px rgba(7, 181, 255, 0.7);" //添加阴影
        };
        if(o == "axis") body.formatter = !isNaN(l) && l == 0 ? `{b${l}}: {c${l}}` : `{b}: {c}`;
        if(o == "item") body.formatter = "{b}: {c} ({d}%)";
        if(o == "time") body.formatter = "{a}<br/>{b} : {c}%";
        return body;
    };

    xAxis = (o, b, c, d) => {
        // Echarts显示X轴信息样式
        var body = {
            type: "category",
            boundaryGap: d ? false : true,
            axisLine: {
                show: b ? false : true,
                lineStyle: {
                    color: "#109ca9"
                }
            },
            axisLabel: {
                textStyle: {
                    color: "#fff",
                    lineHeight: px * 2,
                    fontSize: c || px
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            }
        };
        if(o) body.data = o;
        return body;
    };

    grid = (a, b, c, d) => {
        // Echarts图标在dom里面上下左右的距离
        return {
            top: a || 28,
            right: b || 0,
            bottom: c || -1,
            left: d || 0,
            containLabel: true
        };
    };

    legend = (o, algin) => {
        // Echarts图标类别显示
        var body = {
            type: "scroll",
            orient: "horizontal",
            x: algin ? algin : "center",
            top: px * 0.2,
            width: '80%',
            itemWidth: px * 1.4,
            itemHeight: px * 0.95,
            textStyle: {
                color: "#fff",
                fontSize: px,
                padding: [px * 0.3, px * 0.3, 0, px * 0.3]
            },
            data: o
        };
        if(o) body.data = o;
        return body;
    };
}

export default Unit;