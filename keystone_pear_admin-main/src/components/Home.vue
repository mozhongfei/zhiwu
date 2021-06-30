<template>
  <div class="home" :style="bg_home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="home-title">
        r3inboのfarm
        <van-icon name="arrow" style="font-weight: bold" size="22px" />
      </div>
      <div class="home-status">暂无农场警告信息</div>
      <van-notice-bar
        color="#1989fa"
        background="#ecf9ff"
        class="home-speak"
        left-icon="volume-o"
        text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
      />
      <div class="home-content">
        <div class="home-content-title">
          <span>常用设备</span> <span>其它</span>
        </div>
        <div class="home-content-main">
          <van-row type="flex" justify="space-between">
            <van-col span="11">
              <IOTCard
                img="https://img.yzcdn.cn/vant/cat.jpeg"
                name="加湿器"
                :area="$root.bmeModeStr0"
                id="fa38c7e7-865d-4322-b693-d9f715857d2a"
                pos="0"
                type="coupler"
              ></IOTCard>
            </van-col>
            <van-col span="11">
              <IOTCard
                img="https://img.yzcdn.cn/vant/cat.jpeg"
                name="排风系统"
                :area="$root.ccsModeStr0"
                id="fa38c7e7-865d-4322-b693-d9f715857d2b"
                pos="0"
                type="coupler"
              ></IOTCard>
            </van-col>
            <van-col span="11">
              <IOTCard
                img="https://img.yzcdn.cn/vant/cat.jpeg"
                name="日光灯"
                :area="$root.lightModeStr0"
                id="fa38c7e7-865d-4322-b693-d9f715857d2a"
                pos="1"
                type="coupler"
              ></IOTCard>
            </van-col>
            <van-col span="11">
              <IOTCard
                img="https://img.yzcdn.cn/vant/cat.jpeg"
                name="浇水系统"
                area="大棚B区 | 模式 子设备"
                id="fa38c7e7-865d-4322-b693-d9f715857d2b"
                pos="1"
                type="coupler"
              ></IOTCard>
            </van-col>
            <van-col span="11">
              <IOTCard
                img="https://img.yzcdn.cn/vant/cat.jpeg"
                name="温湿度传感器"
                area="大棚A区 | 模式 自动模式"
                id="fa38c7e7-865d-4322-b693-d9f715857d2a"
                type="bme"
              ></IOTCard>
            </van-col>
            <van-col span="11">
              <IOTCard
                img="https://img.yzcdn.cn/vant/cat.jpeg"
                name="气压传感器"
                area="大棚A区 | 模式 自动模式"
                id="fa38c7e7-865d-4322-b693-d9f715857d2a"
                type="bme"
              ></IOTCard>
            </van-col>
            <van-col span="11">
              <IOTCard
                img="https://img.yzcdn.cn/vant/cat.jpeg"
                name="光照传感器"
                area="大棚A区 | 模式 自动模式"
                id="fa38c7e7-865d-4322-b693-d9f715857d2a"
                type="apds"
              ></IOTCard>
            </van-col>
            <van-col span="11">
              <IOTCard
                img="https://img.yzcdn.cn/vant/cat.jpeg"
                name="二氧化碳传感器"
                :area="ccsModeStr1"
                id="fa38c7e7-865d-4322-b693-d9f715857d2a"
                type="ccs"
              ></IOTCard>
            </van-col>
          </van-row>
        </div>
        <div class="home-footer">
          <div>Copyright © 2017 - 2020 r3inbowari.</div>
          <div>All Rights Reserved.</div>
          <div>Contact: 34787894(QQ)</div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";
import IOTCard from "@/components/Card.vue";

export default {
  name: "Home",
  components: {
    IOTCard,
  },
  props: {},
  data() {
    return {
      ccsModeStr1: "大棚A区 | 模式 " + this.$root.ccsMode,
      config: {
        status: true,
      },
      bg_home: {
        backgroundImage: "url(" + require("@/assets/bg_home.jpg") + ")",
        // backgroundImage: "url(https://i.loli.net/2020/11/25/lMbPkBIu1Ae6pTn.jpg",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
      count: 0,
      isLoading: false,
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.home {
  opacity: 1;
}

.home-title {
  height: 45px;
  margin-left: 20px;

  font-weight: bold;
  font-size: 30px;
  color: rgb(23, 104, 116);
  margin-block-start: 20px;
  margin-block-end: 0px;
}

.home-status {
  margin-left: 20px;
  font-weight: bold;
  font-size: 15px;
  color: rgb(23, 104, 116);
}

.home-speak {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  border-radius: 8px;
}

.home-content {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
}

.home-content-title {
  height: 20px;
}

.home-content-title span {
  left: 20px;
  top: 20px;
  color: rgb(23, 104, 116);
  font-weight: bold;
  font-size: 18px;
}

.home-content-title span:first-child::after {
  position: absolute;
  content: "";
  height: 18px;
  width: 2px;
  background: rgba(128, 167, 173);
  right: 0;
  top: 152px;
  left: 120px;
}

.home-content-title span:nth-child(2) {
  margin-left: 50px;
  color: rgb(131, 167, 174);
}

.home-content-main {
  margin-top: 20px;
}

.home-footer {
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
}
</style>