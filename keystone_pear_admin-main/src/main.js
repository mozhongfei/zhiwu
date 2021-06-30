import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from "axios"
import VCharts from 'v-charts'
import VueAxios from "vue-axios"
import router from "./router"
import { Notify } from 'vant'
import { Dialog } from 'vant'
import { Lazyload } from 'vant'
import vuetify from './plugins/vuetify'

Vue.use(Dialog);
Vue.use(VCharts)
Vue.use(Lazyload)
Vue.use(Notify);
Vue.use(VueAxios, axios)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,

  data() {
    return {
      name: '暂未选择',
      process: '暂未选择',
      timerList: [],
      addTimer: (f, interval) => {
        let timer;
        timer = setInterval(() => {
          f()
        }, interval);
        this.timerList.push(timer)
        console.log("[INFO] Add timer -> " + timer)
      },
      resetAllTimer: () => {
        console.log("[INFO] Clear all timer")
        this.timerList.forEach((item) => {
          console.log("[INFO] Clear timer -> " + item)
          clearInterval(item)
        })
        this.timerList = []
      },
      taskInterval: 99999999,
      taskIotStatus: false,
      ccsMode: '手动模式',
      ccsStatus: false,
      ccsModeStr0: "大棚B区 | 模式 手动模式",
      closeCSSTask() {
        console.log('[INFO] CCS811切换到手动模式');
        this.ccsMode = '手动模式'
        this.ccsModeStr0 = "大棚B区 | 模式 " + this.ccsMode,
          clearInterval(this.taskInterval)
        this.name = '暂未选择'
        this.process = '暂未选择'
      },
      openCSSTask(targetValue) {
        console.log('[INFO] CCS811切换到联动模式 | ' + '设定阈值: ' + targetValue);
        this.ccsMode = '联动模式'
        this.ccsModeStr0 = "大棚B区 | 模式 " + this.ccsMode,
          console.log('[INFO] 尝试清除旧的 Auto task 并重启任务');
        console.log('[INFO] 尝试重启排风系统');
        this.ccsStatus = false
        this.switchTurn('b', 0, 5)
        clearInterval(this.taskInterval)
        this.taskInterval = setInterval(() => {
          this.axios.get('http://r3inbowari.top:2999/ccs/fa38c7e7-865d-4322-b693-d9f715857d2a').then(res => {
            console.log('CCS当前值: ' + res.data.data[0]);
            if (res.data.data[0] > targetValue) {
              if (!this.ccsStatus) {
                this.switchTurn('b', 0, 6)
                this.ccsStatus = true
              }
            } else {
              if (this.ccsStatus) {
                this.switchTurn('b', 0, 5)
                this.ccsStatus = false
              }
            }
          }).catch(() => {
            console.log("[INFO] 网络出现问题！");
          })
        }, 2000);
      },
      switchTurn(mp, val0, val1) {
        this.axios.get('http://r3inbowari.top:2999/coupler/fa38c7e7-865d-4322-b693-d9f715857d2' + mp + '?pos=' + val0 + '&action=' + val1).then(() => {
          this.taskIotStatus = false
        }).catch(() => {
          console.log("[INFO] 网络出现问题！");
        })
      },
      light: [18, 20],
      lightMode: '手动模式',
      taskLightInterval: 999980,
      lightModeStr0: '大棚A区 | 模式 手动模式',
      lightStatus: false,
      openLightTask() {
        console.log('[INFO] APDS切换到联动模式 | ' + '设定阈值: ' + this.light);
        this.lightMode = '联动模式'
        this.lightModeStr0 = '大棚A区 | 模式 ' + this.lightMode
        console.log('[INFO] 尝试清除旧的 Auto task 并重启任务');
        console.log('[INFO] 尝试重启照明系统');
        clearInterval(this.taskLightInterval)
        this.lightStatus = false
        this.taskLightInterval = setInterval(() => {
          let h = new Date().getHours()
          console.log(h);
          if (h >= this.light[0] && h <= this.light[1]) {
            if (!this.lightStatus) {
              console.log('yes');
              this.switchTurn('a', 1, 6)
              this.lightStatus = true
            }
          } else {
            if (this.lightStatus) {
              console.log('no');
              this.switchTurn('a', 1, 5)
              this.lightStatus = false
            }
          }
        }, 10000);
      },
      closeLightTask() {
        console.log('[INFO] APDS切换到手动模式');
        this.rhMode = '手动模式'
        this.lightModeStr0 = '大棚A区 | 模式 ' + this.lightMode
        clearInterval(this.taskLightInterval)
      },
      rh: [40, 50],
      rhStatus: false,
      rhMode: '手动模式',
      bmeModeStr0: '大棚A区 | 模式 手动模式',
      taskRHInterval: 9999999,
      closeRHTask() {
        console.log('[INFO] BME280切换到手动模式');
        this.rhMode = '手动模式'
        this.bmeModeStr0 = '大棚A区 | 模式 ' + this.rhMode
        clearInterval(this.taskRHInterval)
      },
      openRHTask() {
        console.log('[INFO] BME280切换到联动模式 | ' + '设定阈值: ' + this.rh);
        this.rhMode = '联动模式'
        this.bmeModeStr0 = '大棚A区 | 模式 ' + this.rhMode
        console.log('[INFO] 尝试清除旧的 Auto task 并重启任务');
        console.log('[INFO] 尝试重启加湿系统');
        this.rhStatus = false
        this.switchTurn('a', 0, 5)
        clearInterval(this.taskRHInterval)

        this.taskRHInterval = setInterval(() => {
          this.axios.get('http://r3inbowari.top:2999/bme/fa38c7e7-865d-4322-b693-d9f715857d2a').then(res => {
            console.log('BME当前值: ' + res.data.data[0]);
            let max = 0
            let min = 0
            if (this.rh[0] > this.rh[1]) {
              max = this.rh[0]
              min = this.rh[1]
            } else {
              max = this.rh[1]
              min = this.rh[0]
            }
            if (res.data.data[0] < min) {
              if (!this.rhStatus) {
                this.switchTurn('a', 0, 6)
                this.rhStatus = true
              }
            }
            if (res.data.data[0] > max) {
              if (this.rhStatus) {
                this.switchTurn('a', 0, 5)
                this.rhStatus = false
              }
            }
          }).catch(() => {
            console.log("[INFO] 网络出现问题！");
          })
        }, 2000);
      }
    }
  },

  vuetify,
  render: h => h(App)
}).$mount('#app')
