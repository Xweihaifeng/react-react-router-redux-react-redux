let baseUrl = "/"; // 通用接口
let videoUrl = "/"; // 华为视频
let videoUrlClick = "/"; // 华为视频切换
let robotUrl = "/"; // 机器人
let map2Url = "/"; // 2d地图
let map3Url = "/"; // 3d地图
let weatherUrl = "/"; // 天意预报
let iocUrl = "/"; // 大脑平台
let projUrl = "/"; // 平台

switch(process.env.NODE_ENV) {
    case "development":
        baseUrl = "https://www.lxdxc.rongyu-info.com:24006/"; // 通用接口
        videoUrl = "https://www.lxdxc.rongyu-info.com:23004/"; // 华为视频
        videoUrlClick = "https://www.lxdxc.rongyu-info.com:22004/"; // 华为视频切换
        robotUrl = "https://www.lxdxc.rongyu-info.com:24006/"; // 机器人视频
        map2Url = "https://www.lxdxc.rongyu-info.com:27005/"; // 2D地图
        map3Url = "https://www.lxdxc.rongyu-info.com:27002/"; // 3D地图
        weatherUrl = "https://www.lxdxc.rongyu-info.com:22007/"; // 天气预报
        iocUrl = "https://www.lxdxc.rongyu-info.com:24000/"; // 大脑平台
        projUrl = "https://www.lxdxc.rongyu-info.com:24011/"; // 平台
        break;
    case "production":
        baseUrl = "https://www.lxdxc.rongyu-info.com:24006/"; // 通用接口
        videoUrl = "https://www.lxdxc.rongyu-info.com:23004/"; // 华为视频
        videoUrlClick = "https://www.lxdxc.rongyu-info.com:22004/"; // 华为视频切换
        robotUrl = "https://www.lxdxc.rongyu-info.com:24006/"; // 机器人视频
        map2Url = "https://www.lxdxc.rongyu-info.com:27005/"; // 2D地图
        map3Url = "https://www.lxdxc.rongyu-info.com:27002/"; // 3D地图
        weatherUrl = "https://www.lxdxc.rongyu-info.com:22007/"; // 天气预报
        iocUrl = "https://www.lxdxc.rongyu-info.com:24000/"; // 大脑平台
        projUrl = "https://www.lxdxc.rongyu-info.com:24011/"; // 平台
        break;
}

export {
    baseUrl,
    videoUrl,
    videoUrlClick,
    robotUrl,
    map2Url,
    map3Url,
    weatherUrl,
    iocUrl,
    projUrl
};