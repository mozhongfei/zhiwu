<template>
  <div>
    <van-nav-bar
      fixed
      :title="$route.params.name"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="sensor" :style="bg_home">
      <div class="sensor-online">
        <div class="sensor-online-header">
          <div class="sensor-online-header-title">
            <i :class="[pointStatus]"></i>实时数据
          </div>
          <div class="sensor-online-header-time">{{ runTime }}</div>
        </div>
        <div class="sensor-online-content">
          {{ onlineName0 }} {{ onlineValue0 }}
        </div>
        <div class="sensor-online-content">
          {{ onlineName1 }} {{ onlineValue1 }}
        </div>
        <div class="sensor-online-content" v-if="$route.params.type === 'apds'">
          {{ onlineName2 }} {{ onlineValue2 }}
        </div>
        <div class="sensor-online-content" v-if="$route.params.type === 'apds'">
          {{ onlineName3 }} {{ onlineValue3 }}
        </div>
      </div>

      <div class="sensor-chart">
        <ve-line :data="chartData1" :settings="chartSettings"></ve-line>
      </div>
      <div class="sensor-footer">
        <div>Copyright © 2017 - 2020 r3inbowari.</div>
        <div>All Rights Reserved.</div>
        <div>Contact: 34787894(QQ)</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Sensor",
  props: {},
  data() {
    this.chartSettings = {
      stack: { 用户: ["温度", "湿度"] },
      area: true,
    };
    return {
      bg_home: {
        backgroundImage: "url(" + require("@/assets/bg_home.jpg") + ")",
        // backgroundImage: "url(https://i.loli.net/2020/11/25/lMbPkBIu1Ae6pTn.jpg",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
      chartData1: {
        columns: [],
        rows: [],
      },
      onlineName0: "加载中...",
      onlineName1: "加载中...",
      onlineName2: "加载中...",
      onlineName3: "加载中...",
      onlineValue0: 0,
      onlineValue1: 0,
      onlineValue2: 0,
      onlineValue3: 0,
      runTime: "加载中...",
      id: "",
      type: "",
      name: "",
      pointStatus: "status-point-open0",
      pointProcessVector: false,
      pointProcess: 0,
      pointInterval: 0,
    };
  },
  methods: {
    formatTime(dat, fmt) {
      var date = new Date(dat);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
      };
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          var str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
          );
        }
      }
      return fmt;
    },
    getHistory() {
      this.axios
        .get(
          "http://1.116.192.198:2999/tw/" +
            this.$route.params.type +
            "/" +
            this.$route.params.id
        )
        .then((res) => {
          if (this.$route.params.name === "二氧化碳传感器") {
            this.parseCSS(res.data);
          } else if (this.$route.params.name === "气压传感器") {
            this.parsePress(res.data);
          } else if (this.$route.params.name === "温湿度传感器") {
            this.parseDH(res.data);
          } else if (this.$route.params.name === "光照传感器") {
            this.parseAPDS(res.data);
          }
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "操作失败，请检查手机网络！",
          });
        });
    },
    parseDH(res) {
      let index = 11;
      res.forEach((elements) => {
        if (elements === null) {
          this.chartData1.rows.push({
            时间: index,
            温: 0,
            湿: 0,
          });
        } else {
          this.chartData1.rows.push({
            时间: index,
            温: elements[0] ,//- 12
            湿: elements[1],
          });
        }
        index--;
      });
      this.chartData1.columns.push("时间");
      this.chartData1.columns.push("温");
      this.chartData1.columns.push("湿");
    },
    parsePress(res) {
      let index = 11;
      res.forEach((elements) => {
        if (elements === null) {
          this.chartData1.rows.push({
            时间: index,
            压强: 0,
            高度: 0,
          });
        } else {
          this.chartData1.rows.push({
            时间: index,
            压强: elements[2] / 1000,
            高度: elements[3],
          });
        }
        index--;
      });
      this.chartData1.columns.push("时间");
      this.chartData1.columns.push("压强");
      this.chartData1.columns.push("高度");
    },
    parseAPDS(res) {
      let index = 11;
      res.forEach((elements) => {
        if (elements === null) {
          this.chartData1.rows.push({
            时间: index,
            CLEAR: 0,
            RED: 0,
            Green: 0,
            Blue: 0,
          });
        } else {
          this.chartData1.rows.push({
            时间: index,
            CLEAR: elements[0],
            RED: elements[1],
            Green: elements[2],
            Blue: elements[3],
          });
        }
        index--;
      });
      this.chartData1.columns.push("时间");
      this.chartData1.columns.push("CLEAR");
      this.chartData1.columns.push("RED");
      this.chartData1.columns.push("Green");
      this.chartData1.columns.push("Blue");
    },
    parseCSS(res) {
      let index = 11;
      res.forEach((elements) => {
        if (elements === null) {
          this.chartData1.rows.push({
            时间: index,
            CO2: 0,
            质量: 0,
          });
        } else {
          this.chartData1.rows.push({
            时间: index,
            CO2: elements[0],
            质量: elements[1],
          });
        }
        index--;
      });
      this.chartData1.columns.push("时间");
      this.chartData1.columns.push("CO2");
      this.chartData1.columns.push("质量");
    },
    getOnline() {
      // let that = this;
      this.axios
        .get("http://1.116.192.198:2999/" + this.type + "/" + this.id)
        .then((res) => {
          if (this.name === "二氧化碳传感器") {
            this.onlineName0 = "CO2浓度(ppm)";
            this.onlineName1 = "空气质量指数(lv)";
            this.onlineValue0 = res.data.data[0];
            this.onlineValue1 = res.data.data[1];
          } else if (this.name === "气压传感器") {
            this.onlineName0 = "大气压强(kPa)";
            this.onlineName1 = "海拔(m)";
            this.onlineValue0 =
              Math.floor((res.data.data[3] / 1000) * 1000) / 1000;
            this.onlineValue1 = res.data.data[2];
          } else if (this.name === "温湿度传感器") {
            this.onlineName0 = "温度(°C)";
            this.onlineName1 = "湿度(RH)";
            this.onlineValue0 = Math.floor((res.data.data[1] ) * 100) / 100;
           // this.onlineValue0 = Math.floor((res.data.data[1] - 12) * 100) / 100;以后改
            this.onlineValue1 = res.data.data[0];
          } else if (this.name === "光照传感器") {
            this.onlineName0 = "光照量(Lx)";
            this.onlineName1 = "红光(Lx)";
            this.onlineName2 = "绿光(Lx)";
            this.onlineName3 = "蓝光(Lx)";
            this.onlineValue0 = res.data.data[0];
            this.onlineValue1 = res.data.data[1];
            this.onlineValue2 = res.data.data[2];
            this.onlineValue3 = res.data.data[3];
          }
          this.runTime = "最后更新 " + this.formatTime(new Date(res.data.ts * 1000), "hh:mm:ss");
        })
        .catch(() => {
          console.log("[INFO] 网络出现问题！");
        });
    },
  },
  mounted() {
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
    document.documentElement.scrollTop = 0;
    console.log("[INFO] 当前路由指向设备: " + this.$route.params.name);
    if (this.$route.params.name === "二氧化碳传感器") {
      this.getOnline();
      this.$root.addTimer(this.getOnline, 2000);
      this.getHistory();
    } else if (this.$route.params.name === "气压传感器") {
      this.getOnline();
      this.$root.addTimer(this.getOnline, 2000);
      this.getHistory();
    } else if (this.$route.params.name === "温湿度传感器") {
      this.getOnline();
      this.$root.addTimer(this.getOnline, 2000);
      this.getHistory();
    } else if (this.$route.params.name === "光照传感器") {
      this.getOnline();
      this.$root.addTimer(this.getOnline, 2000);
      this.getHistory();
    }
    this.pointInterval = setInterval(() => {
      if (this.pointProcess === 0) {
        this.pointStatus = "status-point-open0";
      } else if (this.pointProcess === 1) {
        this.pointStatus = "status-point-open1";
      } else if (this.pointProcess === 2) {
        this.pointStatus = "status-point-open2";
      } else if (this.pointProcess === 3) {
        this.pointStatus = "status-point-open3";
      } else if (this.pointProcess === 4) {
        this.pointStatus = "status-point-open4";
      } else if (this.pointProcess === 5) {
        this.pointStatus = "status-point-open5";
      }
      if (this.pointProcessVector) {
        this.pointProcess--;
      } else {
        this.pointProcess++;
      }
      if (this.pointProcess === 5 || this.pointProcess === 0) {
        this.pointProcessVector = !this.pointProcessVector;
      }
    }, 100);
  },
  destroyed() {
    this.$root.resetAllTimer();
    clearInterval(this.pointInterval);
  },
};
</script>

<style scoped>
.sensor {
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
}

.sensor-chart {
  background-color: white;
  margin: 0px;
  padding: 20px;
  border-radius: 8px;
}

.sensor-chart:nth-child(2) {
  margin-top: 20px;
}

.sensor-online {
  background-color: white;
  margin: 0px;
  padding: 20px;
  border-radius: 8px;
  font-size: 20px;
}

.sensor-online-header {
  font-weight: bold;
  color: #979797;
  height: 26px;
}

.sensor-online-header-title {
  float: left;
}

.sensor-online-header-time {
  float: right;
  font-size: 14px;
  margin-top: 4px;
}

.sensor-online-content {
  margin-top: 18px;
  color: rgb(51, 51, 51);
  font-size: 15px;
  font-weight: bold;
}

.status-point-open0 {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  top: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgb(103, 194, 58);
}

.status-point-open1 {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  top: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgb(115, 183, 81);
}

.status-point-open2 {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  top: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgb(126, 173, 112);
}

.status-point-open3 {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  top: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgb(135, 165, 121);
}

.status-point-open4 {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  top: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgb(142, 159, 133);
}

.status-point-open5 {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  top: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgb(151, 151, 151);
}

.sensor-footer {
  margin-top: 30px;
  text-align: center;
}
</style>
