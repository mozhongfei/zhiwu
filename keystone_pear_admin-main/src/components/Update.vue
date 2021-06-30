<template>
  <div class="update">
    <van-nav-bar
      fixed
      title="更新中心"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="update-bg">
      <div class="update-content" @click="onOpen">
        <div class="update-device-card-img">
          <van-image
            width="100"
            height="100"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="update-device-card-id">序列号 {{ id }}</div>
        <div class="update-device-card-upload">
          <div>
            <van-button icon="upgrade" type="primary" @click="onUpdate" id="up"
              >设备更新</van-button
            >
          </div>
        </div>
        <div class="update-device-card-title">可扩展式物联网设备</div>
        <div class="update-device-card-type">Mesh 网关</div>

        <div class="update-device-card-version">
          当前硬件版本 {{ major }}.{{ minor }}.{{ patch }}
        </div>
        <div class="update-device-card-version">
          当前最新版本 {{ smajor }}.{{ sminor }}.{{ spatch }}
        </div>
        <div class="update-device-card-version">连接路由 {{ ssid }}</div>
        <div class="update-device-card-version">Mesh 前缀 {{ prefix }}</div>
      </div>
    </div>
    <van-popup
      closeable
      v-model="show"
      @close="onClose"
      round
      position="bottom"
      :style="{ height: '90%' }"
    >
      <div style="padding: 20px">
        <div style="text-align: center; margin-bottom: 20px">
          请填写更新包版本
        </div>
        <van-cell-group>
          <van-field v-model="digit1" type="digit" label="主版本号" />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="digit2" type="digit" label="次版本号" />
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="digit3" type="digit" label="修复版本号" />
        </van-cell-group>

        <van-uploader
          :before-read="beforeRead"
          :after-read="afterRead"
          accept=".bin"
        >
          <van-button
            style="margin-top: 10px"
            round
            block
            type="info"
            native-type="submit"
          >
            上传更新包
          </van-button>
        </van-uploader>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Update",
  props: {},
  data() {
    return {
      show: false,
      id: "加载中...",
      major: 0,
      minor: 0,
      patch: 0,
      smajor: 0,
      sminor: 0,
      spatch: 0,
      ssid: "加载中...",
      prefix: "加载中...",
      digit1: 0,
      digit2: 0,
      digit3: 0,
      getInterval: 0,
    };
  },
  methods: {
    afterRead(obj) {
      let forms = new FormData();
      let configs = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      forms.append("file", obj.file);
      this.axios
        .post(
          "http://1.116.192.198:2999/upload/pear?major=" +
            this.digit1 +
            "&minor=" +
            this.digit2 +
            "&patch=" +
            this.digit3,
          forms,
          configs
        )
        .then((res) => {
          if (res.data.data === "upload succeed") {
            this.$notify({
              type: "success",
              message: "上传成功",
            });
            this.show = false;
          }
        });
    },
    beforeRead(file) {
      if (
        file.type === "application/octet-stream" ||
        file.type === "application/macbinary"
      ) {
        return true;
      }
      this.$notify({
        type: "warning",
        message: "上传文件类型错误(" + file.type + ")",
      });
      return false;
    },
    onClose() {
      console.log(11);
    },
    onOpen(e) {
      if (e.target.id !== "up") {
        this.show = true;
      }
    },
    getInfo() {
      this.axios
        .get("http://1.116.192.198:2999/online")
        .then((res) => {
          if (res.data.length > 0) {
            this.major = res.data[0].major;
            this.minor = res.data[0].minor;
            this.patch = res.data[0].patch;
            this.ssid = res.data[0].ssid;
            this.prefix = res.data[0].prefix;
            this.id = res.data[0].id;
          }
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "操作失败，请检查手机网络！",
          });
        });
    },
    getUpdateInfo() {
      this.axios
        .get("http://1.116.192.198:2999/info/update")
        .then((res) => {
          this.smajor = res.data.major;
          this.sminor = res.data.minor;
          this.spatch = res.data.patch;
          this.digit1 = this.smajor;
          this.digit2 = this.sminor;
          this.digit3 = this.spatch + 1;
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "操作失败，请检查手机网络！",
          });
        });
    },
    onUpdate() {
      this.axios
        .get(
          "http://1.116.192.198:2999/update/fa38c7e7-865d-4322-b693-d9f715857d2a"
        )
        .then(() => {
          this.$notify({
            type: "success",
            message: "推送成功",
          });
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
    this.getInfo();
    this.getUpdateInfo();
    this.getInterval = setInterval(() => {
      this.getUpdateInfo();
    }, 2000);
  },
  destroyed() {
    clearInterval(this.getInterval);
  },
};
</script>


<style scoped>
.update-bg {
  background-color: rgb(255, 255, 255);
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 70px;
}

.update-content {
  background-color: rgb(227, 227, 227);
  border-radius: 8px;
  padding: 20px;
}

.update-device-card-title {
  font-weight: bold;
  font-size: 30px;
}

.update-device-card-type {
  font-weight: bold;
  font-size: 18px;
}

.update-device-card-version {
  font-weight: bold;
  font-size: 18px;
}

.update-device-card-upload {
  position: absolute;
  top: 90px;
  right: 40px;
}

.update-device-card-id {
  font-weight: bold;
  font-size: 12px;
}
</style>