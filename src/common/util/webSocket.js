import Unit from '@/util/unit.js';
import { baseUrl } from "@/api/baseUrl";
export const mixins_webSocket = {
    data() {
        return {
            webSocket: null,
            alarmContent: ' ',
            alarmLevel0: true,
            alarmLevel1: false,
            alarmLevel2: false,
            alarmLevel3: false,
            alarmLevel2Arr: [],
            alarmLevel3Arr: [],
            resultPushObj: null
        }
    },
    methods: {
        /*** 初始化WebSocket */
        initWebSocket() {
            if(!window.WebSocket) {
                console.info('您当前的浏览器不支持WebSocket');
                return
            }
            let url = baseUrl.split("://")[1];
            let scUrl = 'wss://' + url + 'eventWebsocket/00-00-00-00-00-00-00-E0';
            let socketUrl = scUrl;
            if(this.webSocket != null) {
                this.webSocket.close();
                this.webSocket = null;
            }
            this.webSocket = new WebSocket(socketUrl);
            this.webSocket.onopen = function() {
                console.info('--WebSocket is open--')
            };
            this.webSocket.onmessage = (event) => {
                console.info('--WebSocket is success--', event.data)
                this.handleMessageData(event.data);
            };
            this.webSocket.onerror = () => {
                console.info('--WebSocket on error--')
            };
            this.webSocket.onclose = () => {
                console.info('--WebSocket on close--');
            };
        },
        /** * 处理消息体 * @param data*/
        handleMessageData(data) {
            var self = this;
            if(!(data.includes('{') && data.includes('}'))) return false;
            let obj = JSON.parse(data)
            self.resultPushObj = {
                eventId: obj.eventId
            };
            if(new Unit().isObject(obj)) {
                this.alarmLevel1 = true;
                this.alarmContent = obj['eventTypeName'] + '：' + obj['eventName'];
                console.info('---websocket---alarmContent:', this.alarmContent);
            }
        }
    }
}