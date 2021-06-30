<template>
  <div class="iot-card">
    <div id="cb" @click="onClick">
      <van-image width="40" height="40" :src="img" lazy-load />
      <div class="iot-card-attach">
        <i :class="[status ? 'status-point-open' : 'status-point-close']"></i
        >{{ name }}
      </div>
      <div class="iot-card-action">{{ area }}</div>

      <van-action-sheet
        v-model="show"
        title="操作"
        :actions="actions"
        cancel-text="取消"
        @select="select"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    name: String,
    area: String,
    id: String,
    pos: String,
    config: {
      type: Object,
      default() {
        return {};
      },
    },
    type: String,
  },
  data() {
    return {
      show: false,
      status: false,
      actions: [],
      inter: "",
      timerList: [],
    };
  },
  mounted() {
    console.log("[INFO] 识别到设备: " + this.name + ", 类型：" + this.type);
    if (this.type === "coupler") {
      this.getCoupler();
      // add
      this.$root.addTimer(this.getCoupler, 2000);
    } else {
      this.status = true;
    }
  },
  destroyed() {
    this.$root.resetAllTimer();
  },
  methods: {
    onCancel() {
      this.show = false;
    },
    onClick(e) {
      if (e.target.id === "cb") {
        if (this.type === "coupler") {
          this.show = true;
        } else {
          console.log("[INFO] 跳转到" + this.name + "详细页");
          this.$router.push({
            name: "Sensor",
            params: { id: this.id, type: this.type, name: this.name },
          });
        }
      }
    },
    select(action) {
      if (action.name === "打开设备") {
        this.onCoupler(6);
        if (this.name === "加湿器") {
          this.$root.rhStatus = true;
        } else if (this.name === "排风系统") {
          this.$root.ccsStatus = true;
        }
      } else if (action.name === "关闭设备") {
        this.onCoupler(5);
        if (this.name === "加湿器") {
          this.$root.rhStatus = false;
        } else if (this.name === "排风系统") {
          this.$root.ccsStatus = false;
        }
      } else if (action.name === "切换到联动模式") {
        if (this.name === "加湿器") {
          this.$root.openRHTask();
          this.show = false;
        } else if (this.name === "日光灯") {
          this.$root.openLightTask();
          this.show = false;
        }
      } else if (action.name === "切换到手动模式") {
        if (this.name === "加湿器") {
          this.$root.closeRHTask();
          this.show = false;
        } else if (this.name === "排风系统") {
          this.$root.closeCSSTask();
          this.show = false;
        } else if (this.name === "日光灯") {
          this.$root.closeLightTask();
          this.show = false;
        }
      }
    },
    getCoupler() {
      let that = this;
      this.axios
        .get("http://1.116.192.198:2999/coupler/status/" + this.id)
        .then((res) => {
          if (that.pos === "0") {
            that.status = res.data.data.coupler0;
          } else if (that.pos === "1") {
            that.status = res.data.data.coupler1;
          }
          this.actions.length = 0;
          if (this.name === "加湿器") {
            if (this.$root.rhMode === "手动模式") {
              this.actions.push({ name: "切换到联动模式", color: "green" });
            } else {
              this.actions.push({ name: "切换到手动模式", color: "green" });
            }
          }

          if (this.name === "日光灯") {
            if (this.$root.lightMode === "手动模式") {
              this.actions.push({ name: "切换到联动模式", color: "green" });
            } else {
              this.actions.push({ name: "切换到手动模式", color: "green" });
            }
          }

          if (this.name === "排风系统") {
            if (this.$root.ccsMode === "联动模式") {
              this.actions.push({ name: "切换到手动模式", color: "green" });
            }
          }

          if (this.status) {
            this.actions.push({ name: "打开设备", color: "#979797" });
            this.actions.push({ name: "关闭设备" });
          } else {
            this.actions.push({ name: "打开设备" });
            this.actions.push({ name: "关闭设备", color: "#979797" });
          }
        })
        .catch(() => {
          console.log("[INFO] 网络出现问题！");
        });
    },
    onCoupler(val) {
      console.log(
        "http://1.116.192.198:2999/coupler/" +
          this.id +
          "?pos=" +
          this.pos +
          "&action=" +
          val
      );
      this.axios
        .get(
          "http://1.116.192.198:2999/coupler/" +
            this.id +
            "?pos=" +
            this.pos +
            "&action=" +
            val
        )
        .then((res) => {
          if (res.data.data === "oper succeed") {
            this.status = val === 6;
            this.actions.length = 0;
            if (this.name === "加湿器") {
              if (this.$root.rhMode === "手动模式") {
                this.actions.push({ name: "切换到联动模式", color: "green" });
              } else {
                this.actions.push({ name: "切换到自动模式", color: "green" });
              }
            }

            if (this.name === "日光灯") {
              if (this.$root.lightMode === "手动模式") {
                this.actions.push({ name: "切换到联动模式", color: "green" });
              } else {
                this.actions.push({ name: "切换到手动模式", color: "green" });
              }
            }

            if (this.status) {
              this.actions.push({ name: "打开设备", color: "#979797" });
              this.actions.push({ name: "关闭设备" });
            } else {
              this.actions.push({ name: "打开设备" });
              this.actions.push({ name: "关闭设备", color: "#979797" });
            }
            this.show = false;
            this.$notify({ type: "success", message: "操作成功" });
          }
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "操作失败，请检查手机网络！",
          });
        });
    },
  },
};
</script>

<style scoped>
.iot-card {
  position: relative;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);

  margin-top: 15px;
  padding: 10px;

  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.15);
}

.iot-card:active {
  top: 1px;
  left: 1px;
}

.iot-card-img {
  font-size: 16px;
  color: rgb(45, 45, 45);
  font-weight: bold;
}

.iot-card-attach {
  font-size: 12px;
  color: rgb(51, 51, 51);
  font-weight: bold;
}

.iot-card-action {
  font-size: 9px;
  color: rgb(102, 102, 102);
  font-weight: bold;
}

.status-point-open {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  top: -1px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #67c23a;
}

.status-point-close {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  top: -1px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #979797;
}
</style>