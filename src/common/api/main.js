import Ajax from "./baseAjax.js";
import {baseUrl,videoUrl,videoUrlClick,weatherUrl} from "./baseUrl";
import axios from 'axios';
const sqVideo = {functionKey: "mjkk",moduleKey: "spqfg"} // 社区卡口
const zpVideo = {functionKey: "rlzp",moduleKey: "spqfg"} // 人脸抓拍

const physicalUrl = (params) => Ajax.get("http://pv.sohu.com/cityjson", params);
const publicStatic = (params) => Ajax.post(baseUrl + "staticData/getStaticDataJson", params);
/* 园区防控 */
const getHKCameras = (params) => Ajax.get(baseUrl + "gardenPrevent/indicator/getHKCameras", params); // 获取热感设备列表
const getCameraVideoURL = (params) => Ajax.post(baseUrl + "gardenPrevent/indicator/getCameraVideoURL", params); // 获取热感视频url
const jizhan = (params) => Ajax.get(location.protocol+"/json/jizhan9.json", params); // 基站静态数据
const camera = (params) => Ajax.get(location.protocol+"/json/camera.json", params); // 摄像头静态数据
/* 视频列表 */
const devicelist = (params) => Ajax.get(videoUrl + "videoApi/devicelist", params); // 摄像头列表
const devicelistGD = (params) => Ajax.get(videoUrl + "videoApi/devicelistGD", params); // 高点摄像头
const queryRobotList = (params) => Ajax.post(baseUrl + 'innApplication/queryRobotList', params); // 机器人列表
/* 应急图层设备列表 */
const queryEmerCommMapInfo = (params) => Ajax.post(baseUrl + 'emerComm/queryEmerCommMapInfo', params);
/* 统一返回 */
const gaoxiaofangkong = (params) => axios.all([queryEmerCommMapInfo(params), getHKCameras(params)]); // 高校防控所有数据
const yuanqufangkong = (params) => axios.all([jizhan(params), camera(params)]); // 园区防控所有静态数据
const getVideoCamera = (params) => axios.all([devicelist(params),queryRobotList({}),devicelistGD(params),publicStatic(sqVideo),publicStatic(zpVideo)]); // 全部摄像头
const queryEmerCommMapInfoCamera = (params) => axios.all([queryEmerCommMapInfo({}),devicelist(params)]); // 全部应急事件

const traffic = (params) => Ajax.get(location.protocol+"json/business_jjzt.json", params);
const busStation = (params) => Ajax.get(location.protocol+"json/busStationData.json", params);
const busLineData = (params) => Ajax.get(location.protocol+"json/busLineData.json", params);
const iotCity = (params) => Ajax.get(location.protocol+"json/IOTcity.json", params);
const iocVideo = (params) => Ajax.get(location.protocol+"json/video.json", params);
const business = (params) => Ajax.get(location.protocol+"/json/business.json", params);
const queryLightPoleDetails = (params) => Ajax.get(location.protocol+"/json/dg.json", params);
const robotYbDetails = (params) => Ajax.get(location.protocol+"/json/robot.json", params);
const buildingNamePoint = (params) => Ajax.get(location.protocol+"/json/buildingNamePoint.json", params);
export default {
  Url: () => baseUrl,
  physicalUrl,
  weather: (params) => Ajax.get("https://tianqiapi.com/api?version=v6&appid=26998817&appsecret=JSDM6rPU", params), // 天气预报
  weathers: (params,headers) => Ajax.get(weatherUrl + "apiGateway/get-weatherTq-info", params, headers), // 天气预报
  getVideo: (params) => Ajax.get(videoUrl + "videoApi/startPush/", params), // 获取视频
  getHighVideo: (params) => Ajax.get(videoUrlClick + "videoApi/startPush/", params), // 获取视频
  getGdVideo: (params) => Ajax.get(videoUrl + "videoApi/startPushMain", params), // 获取视频
  initVideo: (params) => Ajax.get(videoUrl + "videoApi/startPushSP/", params), // 获取视频
  loginVideo: (params) => Ajax.get(videoUrl + "videoApi/login/", params), // 视频登录
  loginVideoClick: (params) => Ajax.get(videoUrlClick + "videoApi/login/", params), // 切换时视频登录
  devicegroup: (params) => Ajax.get(videoUrl + "videoApi/devicegroup/", params), // 视频设备组
  rtspToHls: (params) => Ajax.post(videoUrl + "videoApi/rtspToHls", params), // rtsp视频流转换
  devicelist, // 视频列表
  devicelistGD, // 高点摄像头 视频
  queryRobotList, // 机器人列表
  getVideoCamera,
  queryEmerCommMapInfoCamera, // 全部应急事件

  // 地图数据加载
  getHKCameras, // 获取热感设备列表
  getCameraVideoURL, // 获取热感视频url
  gaoxiaofangkong, // 高校防控所有数据
  jizhan, // 基站点
  camera, // 热感摄像头
  yuanqufangkong, // 园区防空图层数据
  traffic, // 交通主题图层数据
  busStation, // 公交站
  busLineData, // 公交站点
  iotCity,
  iocVideo,
  business, // 企业统计
  queryLightPoleDetails, // 智慧灯杆
  robotYbDetails, // 智慧灯杆
  buildingNamePoint, // 地图字体流光

  // 管理一张图
  publicStatic,
  queryParkInfo: (params) => Ajax.post(baseUrl + "mangeMap/queryParkInfo/", params), // 当日告警监测
  queryCaseInfo: (params) => Ajax.post(baseUrl + "mangeMap/queryCaseInfo/", params), // 图案件信息测
  queryTodayWarnInfo: (params) => Ajax.post(baseUrl + "mangeMap/queryTodayWarnInfo", params), // 当日告警监测
  queryHistoryWarnInfo: (params) => Ajax.post(baseUrl + "mangeMap/queryHistoryWarnInfo/", params), // 查询历史预警
  queryMapWarnInfo: (params) => Ajax.post(baseUrl + "mangeMap/queryMapWarnInfo/", params), // 地图事件
  getWarnTypeList: (params) => Ajax.post(baseUrl + "mangeMap/getWarnTypeList/", params), // 地图事件类型

  // 物联资产
  getITOCityInfo: (params) => Ajax.post(baseUrl + "itoCity/getITOCityInfo", params), // 查询物联城市设备相关汇总
  getPartDeviceType: (params) => Ajax.post(baseUrl + "itoCity/getPartDeviceType", params), // 查询园区物联设备分类
  selectProblemDeviceTOP10: (params) => Ajax.post(baseUrl + "itoCity/selectProblemDeviceTOP10", params), // 查询问题部件排行TOP10
  queryDeviceTypeDistribution: (params) => Ajax.post(baseUrl + "itoCity/queryDeviceTypeDistribution", params), // 部件告警排行top10-分布占比
  getAreaDeviceDistribution: (params) => Ajax.post(baseUrl + "itoCity/getAreaDeviceDistribution", params), // 查询区域资产分布
  getAssetAddOrConsume: (params) => Ajax.post(baseUrl + "itoCity/getAssetAddOrConsume", params), // 查询园区资产新增和损耗
  getDemandProportion: (params) => Ajax.post(baseUrl + "itoCity/getDemandProportion", params), // 查询本年资产相关诉求案件分布
  selectDeviceList: (params) => Ajax.post(baseUrl + "itoCity/selectDeviceList", params), // 资产查询
  getDeviceTypeList: (params) => Ajax.post(baseUrl + "itoCity/getDeviceTypeList", params), // 查询物联网设备类型列表
  getMapDeviceDetailList: (params) => Ajax.post(baseUrl + "itoCity/getMapDeviceDetailList", params), // 查询物联网设备类型列表
  getDeviceWarningMessage: (params) => Ajax.post(baseUrl + "itoCity/getDeviceWarningMessage", params), // 

  // 全景展示
  queryParkScale: (params) => Ajax.post(baseUrl + "panoramic/queryParkScale", params), // 查询全景展示园区规模信息
  queryParkVehicleFlow: (params) => Ajax.post(baseUrl + 'panoramic/queryParkVehicleFlow', params), // 园区近30天日均车流量
  queryParkVisitorsFlowrate: (params) => Ajax.post(baseUrl + 'panoramic/queryParkVisitorsFlowrate', params), // 园区近30天日均人流量信息
  queryIndustryType: (params) => Ajax.post(baseUrl + 'panoramic/queryIndustryType', params), // 查询企业行业类型TOP5分布
  queryMapDataByType: (params) => Ajax.post(baseUrl + 'panoramic/queryMapDataByType', params), // 根据类型查询地图布点数据
  getAssetsInfo: (params) => Ajax.post(baseUrl + 'panoramic/getSystemDataCount', params), // 查询数据资产量

  // 事件主题
  getSevenFiveEvents: (params) => Ajax.post(baseUrl + 'event/manager/getSevenFiveEvents', params), // 接诉即办列表
  eventManagergetEvents: (params) => Ajax.post(baseUrl + 'event/manager/getEvents', params), // 事件列表、结案率、平均结案时长、按类型统计
  eventManagerEventReportTop: (params) => Ajax.post(baseUrl + 'event/manager/eventReportTop', params), // Top5、累计事件数量、未结案事件-逾期、未结案事件-未逾期
  eventManagerEventUnfinishStatistics: (params) => Ajax.post(baseUrl + 'event/manager/eventUnfinishStatistics', params), // 未结事件阶段分布
  eventManagerEventTypeStatistics: (params) => Ajax.post(baseUrl + 'event/manager/eventTypeStatistics', params), // 事件类型分布
  eventManagerEventStateAndType: (params) => Ajax.post(baseUrl + 'event/manager/eventStateAndType', params), // 事件类型和阶段
  eventManagerEventDepartmentStatistics: (params) => Ajax.post(baseUrl + 'event/manager/eventDepartmentStatistics', params), // 事件责任部门分布
  eventManagerFindEventById: (params) => Ajax.post(baseUrl + 'event/manager/findEventById', params), // 根据事件编号查询事件信息、此类事件发生率
  eventManagerEventListByType: (params) => Ajax.post(baseUrl + 'event/manager/getEventListByType', params), // 根据事件类型查询对应的事件列表

  // 人员主题
  getPersonList: (params) => Ajax.post(baseUrl + 'gardenPrevent/indicator/getPersonList', params), // 速通门人员进出详情
  getInAndOutPerson: (params) => Ajax.get(baseUrl + 'gardenPrevent/indicator/getInAndOutPerson', params), // 速通门24小时人员进出情况
  queryMaleFemaleRatio: (params) => Ajax.post(baseUrl + 'person/queryMaleFemaleRatio', params), // 查询园区男女数量
  queryCommunityPerson: (params) => Ajax.post(baseUrl + 'person/queryCommunityPerson', params), // 查询人员主题社区人员分布
  queryPersonInOrOut: (params) => Ajax.post(baseUrl + 'person/queryPersonInOrOut', params), // 当日人员流入流出分析
  querySchoolPersonTrend: (params) => Ajax.post(baseUrl + 'person/querySchoolPersonTrend', params), // 各学校历年人口总数走势
  querySchoolStudentProportion: (params) => Ajax.post(baseUrl + 'person/querySchoolStudentProportion', params), // 各学校学生占比
  querySchoolDiplomaProportion: (params) => Ajax.post(baseUrl + 'person/querySchoolDiplomaProportion', params), // 各学校教职工学历情况占比
  queryTemperatureDistribution: (params) => Ajax.post(baseUrl + 'gardenPrevent/indicator/queryTemperatureDistribution', params), // 体温分布情况
  queryMapDeviceInfo: (params) => Ajax.post(baseUrl + 'person/queryMapDeviceInfo', params), // 热感设备地图展示
  queryTemperatureAbnormalList: (params) => Ajax.post(baseUrl + 'gardenPrevent/indicator/queryTemperatureAbnormalList', params), // 体温报警列表
  queryMonitorDetail: (params) => Ajax.post(baseUrl + 'person/queryMonitorDetail', params), // 根据设备ID查询体温监测详情列表
  getCameraAlarmPersonnelStatistics: () => Ajax.get(baseUrl + 'gardenPrevent/indicator/getCameraAlarmPersonnelStatistics'), 

  // 应急指挥
  queryDayDutyInfo: (params) => Ajax.post(baseUrl + 'emerComm/queryDayDutyInfo', params), // 查询值班情况
  queryEventType: (params) => Ajax.post(baseUrl + 'emerComm/queryEventType', params), // 事件类型
  queryEventList: (params) => Ajax.post(baseUrl + 'emerComm/queryEventList', params), // 查询事件列表
  queryEmerCommMapInfo, // 查询应急指挥地图信息
  queryContingPlanNum: (params) => Ajax.post(baseUrl + 'emerComm/queryContingPlanNum', params), // 查询应急指挥预案个数
  queryEmerDistribuInfo: (params) => Ajax.post(baseUrl + 'emerComm/queryEmerDistribuInfo', params), // 查询应急事件分布信息
  queryEmergencyInfoById: (params) => Ajax.post(baseUrl + 'emerComm/queryEmergencyInfoById', params), // 查询推送应急事件信息
  queryPlanData: (params) => Ajax.post(baseUrl + 'emerComm/queryPlanData', params), // 应急预案
  getPersonPosition: (params) => Ajax.get(baseUrl + 'event/manager/getPersonPosition', params), // 单兵

  // 资产主题
  cityComponentManageGetComponentTypes: (params) => Ajax.post(baseUrl + 'cityComponent/manage/getComponentTypes', params), // 城市部件类型信息
  cityComponentManageGetCityComponents: (params) => Ajax.post(baseUrl + 'cityComponent/manage/getCityComponents', params), // 部件列表信息
  cityComponentManageGetComponentInfo: (params) => Ajax.post(baseUrl + 'cityComponent/manage/getComponentInfo', params), // 部件详情
  cityComponentManageFindDeviceAlarmById: (params) => Ajax.post(baseUrl + 'cityComponent/manage/findDeviceAlarmById', params), // 根据设备编号查询告警信息
  cityComponentManageDeviceAlarmStatistics: (params) => Ajax.post(baseUrl + 'cityComponent/manage/deviceAlarmStatistics', params), // 设备告警历史趋势统计
  cityComponentManageGetDeviceAlarmLists: (params) => Ajax.post(baseUrl + 'cityComponent/manage/getDeviceAlarmLists', params), // 查询设备告警历史信息（分页）

  // 公共服务
  queryPollutantsAndLevels: (params) => Ajax.post(baseUrl + 'publicService/queryPollutantsAndLevels', params), // 查询污染物及级别接口
  queryTransitOperMonitor: (params) => Ajax.post(baseUrl + 'publicService/queryTransitOperMonitor', params), // 查询公交运行监测接口
  queryLibraryDetailInfo: (params) => Ajax.post(baseUrl + 'publicService/queryLibraryDetailInfo', params), // 查询所有图书馆详情
  queryPublicLibInfo: (params) => Ajax.post(baseUrl + 'publicService/queryPublicLibInfo', params), // 查询公共图书馆图书
  queryLiteratureInfo: (params) => Ajax.post(baseUrl + 'publicService/queryLiteratureInfo', params), // 查询图书馆/文献信息

  // 交通运行
  trafficVehicleStatistics: (params) => Ajax.post(baseUrl + 'traffic/manage/trafficVehicleStatistics', params), // 当日园区过往车辆统计
  trafficSpeedStatistics: (params) => Ajax.post(baseUrl + 'traffic/manage/trafficSpeedStatistics', params), // 当日交通时速分析
  trafficJamStatistics: (params) => Ajax.post(baseUrl + 'traffic/manage/trafficJamStatistics', params), // 当日交通拥堵里程态势
  vehicleViolationStatistics: (params) => Ajax.post(baseUrl + 'traffic/manage/vehicleViolationStatistics', params), // 近30天车辆违章分析
  truckStopedStatistics: (params) => Ajax.post(baseUrl + 'traffic/manage/truckStopedStatistics', params), // 近30天大货车违停统计
  pedestrianViolationStatistics: (params) => Ajax.post(baseUrl + 'traffic/manage/pedestrianViolationStatistics', params), // 近30天行人闯红灯统计
  getComonentStatistics: (params) => Ajax.post(baseUrl + 'traffic/manage/getComonentStatistics', params), // 获取交通设施信息以及统计信息

  getStaticDataJson: (params) => Ajax.post(baseUrl + 'staticData/getStaticDataJson', params), // 获取指标信息
  getParkingRealTimeData: (params) => Ajax.get(baseUrl + 'gardenPrevent/indicator/getParkingRealTimeData', params), // 查询智慧停车场实时进出情况
  getParkingRealTimeList: (params) => Ajax.post(baseUrl + 'gardenPrevent/indicator/getParkingRealTimeList', params), // 查询智慧停车场车辆出入记录列表



  // 创新应用
  queryRobotNum: (params) => Ajax.post(baseUrl + 'innApplication/queryRobotNum', params), // 查询机器人数量
  queryRobotWorkHours: (params) => Ajax.post(baseUrl + 'innApplication/queryRobotWorkHours', params), // 机器人工作时长监测
  // queryRobotList: (params) => Ajax.post(baseUrl + 'innApplication/queryRobotList', params), // 通过截至日期查询机器人信息
  queryRobotDetails: (params) => Ajax.post(baseUrl + 'innApplication/queryRobotDetails', params), // 查询机器人详情
  queryEarlyWarnInfo: (params) => Ajax.post(baseUrl + 'innApplication/queryEarlyWarnInfo', params), // 查询预警监测
  queryFaceDetectRecordList: (params) => Ajax.post(baseUrl + 'innApplication/queryFaceDetectRecordList', params), // 查询人脸识别记录列表
  queryVehicleDiscernList: (params) => Ajax.post(baseUrl + 'innApplication/queryVehicleDiscernList', params), // 查询车辆识别记录列表
  queryRobotCurrentLocaltion: (params) => Ajax.post(baseUrl + 'innApplication/queryRobotCurrentLocaltion', params), // 查询机器人当前位置

  getIocToken: (params) => Ajax.get('https://www.lxdxc.rongyu-info.com:24001/iocua/token',params),
}