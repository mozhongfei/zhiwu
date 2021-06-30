<template>
  <div class="me">
    <div class="me-header">
      <div class="me-header-cover" :style="bg_me_banner">
        <van-image
          class="me-header-img"
          round
          width="5rem"
          height="5rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="me-header-name">r3inbowari</div>
        <div class="me-header-device">2个智能设备</div>
      </div>
      <div class="me-message-bg">
        <div class="me-message-fg" @click="onMessage">
          <van-icon color="#32BAC0" size="30" name="envelop-o" /><span
            >消息中心</span
          ><van-icon class="me-message-fg-arrow" name="arrow" />
        </div>
      </div>
    </div>
    <div class="me-content-bg">
      <div style="margin-bottom: 10px" class="me-content">
        <van-cell size="large" title="设备重置" @click="show = true" is-link />
        <van-cell
          size="large"
          title="设备更新"
          @click="onClcikUpdate"
          is-link
        />
        <van-cell size="large" title="其他" is-link />
        <van-cell size="large" title="设置" is-link />
        <van-cell size="large" title="帮助与反馈" is-link />
      </div>
      <div style="margin-bottom: 10px" class="me-content">
        <van-cell size="large" title="小组件" is-link />
        <van-cell size="large" title="自动化" is-link />
        <van-cell size="large" title="网关" is-link />
      </div>
      <div class="me-content">
        <van-cell size="large" title="帮助与反馈" is-link />
        <van-cell size="large" title="用户协议与隐私" is-link />
        <van-cell size="large" title="评分" is-link />
        <van-cell size="large" title="退出" is-link />
      </div>
      <div class="me-footer">
        <div>Copyright © 2017 - 2020 r3inbowari.</div>
        <div>All Rights Reserved.</div>
        <div>Contact: 34787894(QQ)</div>
      </div>
    </div>
    <van-dialog
      v-model="show"
      title="确定要重置所有设备吗"
      show-cancel-button
      @confirm="onReset"
    >
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "Me",
  props: {},
  data() {
    return {
      show: false,
      bg_me_banner: {
        backgroundImage: "url(" + require("@/assets/bg_me_banner.jpeg") + ")",
        // backgroundImage: "url(https://i.loli.net/2020/11/25/lMbPkBIu1Ae6pTn.jpg",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
      count: 0,
      isLoading: false,
    };
  },
  methods: {
    onClcikUpdate() {
      this.$router.push({
        name: "Update",
      });
    },
    onMessage() {
      this.$router.push({
        name: "Message",
      });
    },
    onReset() {
      this.axios(
        "http://1.116.192.198:2999/coupler/fa38c7e7-865d-4322-b693-d9f715857d2a?pos=0&action=5"
      )
        .then(() => {
          console.log("[INFO] 重置成功");
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "操作失败，请检查手机网络！",
          });
        });
      this.axios(
        "http://1.116.192.198:2999/coupler/fa38c7e7-865d-4322-b693-d9f715857d2a?pos=1&action=5"
      )
        .then(() => {
          console.log("[INFO] 重置成功");
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "操作失败，请检查手机网络！",
          });
        });
      this.axios(
        "http://1.116.192.198:2999/coupler/fa38c7e7-865d-4322-b693-d9f715857d2b?pos=0&action=5"
      )
        .then(() => {
          console.log("[INFO] 重置成功");
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "操作失败，请检查手机网络！",
          });
        });
      this.axios(
        "http://1.116.192.198:2999/coupler/fa38c7e7-865d-4322-b693-d9f715857d2b?pos=1&action=5"
      )
        .then(() => {
          console.log("[INFO] 重置成功");
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "操作失败，请检查手机网络！",
          });
        });

      this.$root.rhStatus = false;
      this.$root.ccsStatus = false;
    },
  },
  mounted() {
    document.documentElement.scrollTop = 0;
  },
};
</script>

<style scoped>
.me-header-img {
  margin-top: 60px;
  margin-left: 20px;
}

.me-header-name {
  position: absolute;
  top: 80px;
  left: 120px;
  font-weight: bold;
  font-size: 20px;
}

.me-header-device {
  position: absolute;
  top: 110px;
  left: 120px;
  font-weight: bold;
  font-size: 13px;
}

.me-header-cover {
  height: 200px;
}

.me-message-bg {
  height: 40px;
  background-color: rgb(247, 247, 247);
}

.me-message-fg {
  position: absolute;
  height: 60px;
  background-color: rgb(255, 255, 255);

  left: 20px;
  right: 20px;
  top: 170px;
  border-radius: 8px;
  padding: 17px;
}

.me-message-fg span {
  position: relative;
  font-weight: bold;
  font-size: 18px;
  left: 20px;
  top: -8px;
}

.me-message-fg-arrow {
  position: absolute;
  right: 20px;
  top: 25px;
  color: #979797;
}

.me-content-bg {
  background-color: rgb(247, 247, 247);
  /* background-color: sienna; */
  padding: 20px;
}

.me-content {
  background-color: rgb(255, 255, 255);
  /* background-color: royalblue; */
  border-radius: 8px;
  padding: 5px;
}

.me-footer {
  margin-top: 30px;
  text-align: center;
}
</style>
