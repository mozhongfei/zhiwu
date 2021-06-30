<template>
  <div class="dash" :style="bg_dash">
    <van-nav-bar
      fixed
      title="数据监控台"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="dash-content">
      <div>
        <DashCard
          type="bme"
          id="fa38c7e7-865d-4322-b693-d9f715857d2a"
          name="温湿度传感器"
          na="温度"
          :value="data1"
          unit="(°C)"
        ></DashCard>
      </div>
      <div>
        <DashCard
          type="bme"
          id="fa38c7e7-865d-4322-b693-d9f715857d2a"
          name="温湿度传感器"
          na="湿度"
          :value="data2"
          unit="(RH)"
        ></DashCard>
      </div>
      <div>
        <DashCard
          type="apds"
          id="fa38c7e7-865d-4322-b693-d9f715857d2a"
          name="光照传感器"
          na="光照强度"
          :value="data3"
          unit="(Lx)"
        ></DashCard>
      </div>
      <div>
        <DashCard
          type="ccs"
          id="fa38c7e7-865d-4322-b693-d9f715857d2a"
          name="二氧化碳传感器"
          na="CO2浓度"
          :value="data0"
          unit="(ppm)"
        ></DashCard>
      </div>
      <div>
        <DashCard
          type="bme"
          id="fa38c7e7-865d-4322-b693-d9f715857d2a"
          name="气压传感器"
          na="气压"
          :value="data4"
          unit="(kPa)"
        ></DashCard>
      </div>
    </div>
    <div class="dash-footer">
      <div>Copyright © 2017 - 2020 r3inbowari.</div>
      <div>All Rights Reserved.</div>
      <div>Contact: 34787894(QQ)</div>
    </div>
  </div>
</template>


<script>
import DashCard from "@/components/DashCard.vue";
export default {
  components: {
    DashCard,
  },
  data: () => ({
    data0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    data1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    data2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    data3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    data4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    bg_dash: {
      backgroundImage: "url(" + require("@/assets/bg_home.jpg") + ")",
      // backgroundImage: "url(https://i.loli.net/2020/11/25/lMbPkBIu1Ae6pTn.jpg",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    value: [423, 446, 675, 510, 590, 610, 760],
    id: "fa38c7e7-865d-4322-b693-d9f715857d2a",
  }),
  methods: {
    getCSSHistory() {
      this.axios
        .get("http://1.116.192.198:2999/tw/ccs/" + this.id)
        .then((res) => {
          this.data0.length = 0;
          res.data.forEach((element) => {
            if (element === null) {
              this.data0.push(Math.floor(0));
            } else {
              this.data0.push(element[0]);
            }
          });
          this.data0.reverse();
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "操作失败，请检查手机网络！",
          });
        });
    },
    getAPDSHistory() {
      this.axios
        .get("http://1.116.192.198:2999/tw/apds/" + this.id)
        .then((res) => {
          this.data3.length = 0;
          res.data.forEach((element) => {
            if (element === null) {
              this.data3.push(Math.floor(0));
            } else {
              this.data3.push(element[0]);
            }
          });
          this.data3.reverse();
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "操作失败，请检查手机网络！",
          });
        });
    },
    getBMEHistory() {
      this.axios
        .get("http://1.116.192.198:2999/tw/bme/" + this.id)
        .then((res) => {
          this.data1.length = 0;
          this.data2.length = 0;
          this.data4.length = 0;
          res.data.forEach((element) => {
            if (element === null) {
              this.data1.push(Math.floor(0));
              this.data2.push(Math.floor(0));
              this.data4.push(Math.floor(0));
            } else {
              this.data1.push(Math.floor((element[0] - 12) * 100) / 100);
              this.data2.push(element[1]);
              this.data4.push(Math.floor((element[2] / 1000) * 100) / 100);
            }
          });
          this.data1.reverse();
          this.data2.reverse();
          this.data4.reverse();
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "操作失败，请检查手机网络！",
          });
        });
    },
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    this.getCSSHistory();
    this.getBMEHistory();
    this.getAPDSHistory();
  },
};
</script>

<style scoped>
.dash-content {
  margin-top: 40px;
}

.dash-footer {
  margin-top: 30px;
  text-align: center;
  margin-bottom: 20px;
}
</style>