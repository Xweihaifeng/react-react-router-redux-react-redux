import Unit from '@/util/unit.js';
import Request from '@/api/main.js';

export const mixins_webGL = {
    data() {
		var routerPath = this.$router.history.current.name;
        return {
            publicPath: process.env.BASE_URL,
            nav: {}, //左下右指标模块toggle
            px: 12,
            viewer: null,
            scene: null,
            camera: null,
            center: {
                token: 'pk.eyJ1IjoiMTgzODI0ZHl0IiwiYSI6ImNqbHExNDVjZzI0ZmUza2wxMDhocnlyem4ifQ.FZoJzmqTtli8hAvvAc1OPA',
                D2URL: routerPath == "Yqfk" ? new Unit().center().new_D2URL : new Unit().center().D2URL,
                D3URL: routerPath == "Yqfk" ? new Unit().center().new_D3URL : new Unit().center().D3URL
            },
            buildingLsit: [], // 字体流光
            mapPopupShow: false, // 地图--弹窗显示
            scenePosition: null, // 地图--获取点击点坐标
            hoverBoxPositon: { // 地图--弹窗坐标
                top: 0,
                left: 0
            },
            mapOlPopupData: {}, // 地图--弹层显示内容
            startTime: new Unit().getFormatDate(new Date(), 'd0'),
            endTime: new Unit().getFormatDate(new Date(), 'd1'),
            disabledDate: { // 时间限定
                disabledDate(date) {
                    return date && date.valueOf() > Date.now();
                }
            },
            t: {
                s: " 00:00:00",
                e: " 23:59:59"
            },
        }
    },
    components: {},
    computed: {},
    created() {},
    mounted() {},
    methods: {
        setImg(url) {
            var self = this;
            return self.publicPath + url
        },
        getImg(url) {
            return require('../assets/img/' + url);
        },
        navToggle(x) {
            var self = this;
            switch(x) {
                case 0:
                    self.nav.navl = !self.nav.navl;
                    self.nav.navt = !self.nav.navt;
                    break;
                case 1:
                    self.nav.navb = !self.nav.navb;
                    break;
                case 2:
                    self.nav.navr = !self.nav.navr;
                    break;
                default:
                    if(!self.nav.navl) {
                        self.nav.navt = !self.nav.navt;
                    }
            }
        },
        // 当前时间前推n天
        changeTime(o,n=2) {
            var startDate = new Date(o);
            startDate.setDate(startDate.getDate());
            return new Unit().getFormatDate(startDate, 'd0');
        },
        // 开启相机绕中心点旋转
        openRotate() {
            var self = this;
            self.camera.flyCircle({
                x: -2163408.363675501,
                y: 4402883.01910387,
                z: 4076158.731619549
            });
        },
        // 停止相机绕中心点旋转
        stopRotate() {
            var self = this;
            self.camera.stopFlyCircle();
        },
        // 关闭地图echarts
        closeEchart() {
            var self = this;
            self.mapPopupShow = false;
        },
        createWebGLMap(dom) {
            var self = this;
            self.viewer = new Cesium.Viewer(dom, {
                resolutionScale: 2,
                infoBox: false, // 点击dom层
                timeline: false, // 时间轴
                sceneModePicker: false, //二三维转换
                navigation: false // 是否显示导航罗盘控件
            });
            var layers1 = self.viewer.imageryLayers.addImageryProvider(
                new Cesium.SuperMapImageryProvider({
                    url: self.center.D2URL
                })
            );
            self.viewer.zoomTo(layers1);
            self.viewer._cesiumWidget._creditContainer.style.display = 'none';
            self.scene = self.viewer.scene;
            self.scene.globe.depthTestAgainstTerrain = false;
            self.scene.shadowMap.darkness = 1.275; //设置第二重烘焙纹理的效果（明暗程度）
            self.scene.skyAtmosphere.brightnessShift = 0.4; //修改大气的亮度
            self.scene.debugShowFramesPerSecond = false;
            self.scene.hdrEnabled = false;
            self.scene.sun.show = false;
            // 添加垂直方向的平行光源
            var position = new Cesium.Cartesian3(-2181832.669422784, 4380035.081259461, 4093003.6925714);
            self.scene.addLightSource(
                new Cesium.DirectionalLight(position, {
                    intensity: 1
                })
            );
            var widget = self.viewer.cesiumWidget;
            self.camera = self.scene.camera;
            try {
                var promise = self.scene.open(self.center.D3URL);
                Cesium.when(
                    promise,
                    function(layer) {
                        self.initWebGLMap();
                        self.camera.flyCircleLoop = true; // 相机绕点旋转开启循环模式
                        self.camera.speedRatio = Number(0.2); //旋转速度
                    },
                    function(e) {
                        if(widget._showRenderLoopErrors) {
                            var title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
                            widget.showErrorPanel(title, undefined, e);
                        }
                    }
                );
            } catch(e) {
                if(widget._showRenderLoopErrors) {
                    var title = '渲染时发生错误，已停止渲染。';
                    widget.showErrorPanel(title, undefined, e);
                }
            }
            setTimeout(function() {
                Request.buildingNamePoint().then(res => {
                    self.buildingLsit = res.pointList;
                    self.buildingLsit.map((item) => {
                        item.position = Cesium.Cartesian3.fromDegrees(item.pointX, item.pointY, 100);
                        var windowPosition = new Cesium.Cartesian2();
                        Cesium.SceneTransforms.wgs84ToWindowCoordinates(self.scene, item.position, windowPosition);
                        item.top = (windowPosition.y) + 'px';
                        item.left = (windowPosition.x - 80) + 'px';
                    });
                    self.scene.postRender.addEventListener(function(e) {
                        var viewerH = self.viewer.camera.positionCartographic.height;
                        self.buildingLsit.map((item) => {
                            if(viewerH <= 1200 && !item.show) {
                                item.level = 1;
                            }
                            if(viewerH > 1200 && !item.show) {
                                item.level = 0;
                            }
                            item.position = item.position ? item.position : Cesium.Cartesian3.fromDegrees(0, 0, 0);
                            var windowPosition = new Cesium.Cartesian2();
                            Cesium.SceneTransforms.wgs84ToWindowCoordinates(self.scene, item.position, windowPosition);
                            item.top = (windowPosition.y) + 'px';
                            item.left = (windowPosition.x - 80) + 'px';
                        });
                    });
                });
            }, 2000);
            var handler = new Cesium.ScreenSpaceEventHandler(self.scene.canvas);
            handler.setInputAction(function(e) {
                //获取点击位置笛卡尔坐标
                var clickPosition = self.scene.pickPosition(e.position);
                //将笛卡尔坐标转化为经纬度坐标
                var cartographic = Cesium.Cartographic.fromCartesian(clickPosition);
                var longitude = Cesium.Math.toDegrees(cartographic.longitude);
                var latitude = Cesium.Math.toDegrees(cartographic.latitude);
                var height = cartographic.height;
                console.info(longitude, latitude, height);
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        },
        // 恢复到初始位置
        initWebGLMap(x,y) {
            var self = this;
			var new_y = this.$router.history.current.name == 'Yqfk' ? 39.71299824856141 : 39.72799824856141;
			var new_x = this.$router.history.current.name == 'Yqfk' ? 116.15521937942505 : 116.16521937942505;
			var mapHeight = this.$router.history.current.name == 'Yqfk' ? 15000 : 9000;
            self.camera.flyTo({
                duration: 1,
                destination: new Cesium.Cartesian3.fromDegrees((x || new_x), (y || new_y), mapHeight),
                // destination: new Cesium.Cartesian3.fromDegrees((x||116.16521937942505), (y||39.72799824856141), 6000),
                orientation: {
                    heading: Cesium.Math.toRadians(0), // 获取相机方位角、偏航角，单位为弧度。
                    pitch: Cesium.Math.toRadians(-90), // 获取相机的俯仰角，单位为弧度。
                    roll: Cesium.Math.toRadians(0) // 获取相机旋转角度、翻滚角，单位为弧度。
                }
            });
        }
    },
    watch: {},
    destroyed() {},
}