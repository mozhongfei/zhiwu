<template>
  <div class="wiki-card" @click="onClick">
    <div class="wiki-card-img">
      <van-image
        width="100"
        height="120"
        lazy-load
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
    <div class="wiki-content">
      <div class="wiki-content-title">{{ name }}</div>
      <van-divider style="margin: 5px 0" />

      <van-row>
        <van-col span="12"
          ><div class="wiki-content-text">
            <div>幼苗期</div>
            <div>{{ ppms[0] }}ppm</div>
          </div>
        </van-col>
        <van-col span="12"
          ><div class="wiki-content-text">
            <div>开花期</div>
            <div>{{ ppms[1] }}ppm</div>
          </div>
        </van-col>
        <van-col span="24"><div style="height: 9px"></div></van-col>
        <van-col span="12"
          ><div class="wiki-content-text">
            <div>结果期</div>
            <div>{{ ppms[2] }}ppm</div>
          </div>
        </van-col>
        <van-col span="12"
          ><div class="wiki-content-text">
            <div>盛果期</div>
            <div>{{ ppms[3] }}ppm</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <van-action-sheet
      id="asheet"
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      :description="desc"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  props: {
    ppms: Array,
    name: String,
  },
  data() {
    return {
      pname: "",
      pppms: [],
      desc: "",
      show: false,
      actions: [
        { name: "🌿 幼苗期" },
        { name: "🌼 开花期" },
        { name: "🍋 结果期" },
        { name: "🥗 盛果期" },
      ],
    };
  },
  methods: {
    onClick(e) {
      if (e.target.nodeName === "DIV" || e.target.nodeName === "IMG") {
        this.show = true;
      }
    },
    onSelect(e) {
      let value = 0;

      if (e.name === "🌿 幼苗期") {
        value = this.pppms[0];
      } else if (e.name === "🌼 开花期") {
        value = this.pppms[1];
      } else if (e.name === "🍋 结果期") {
        value = this.pppms[2];
      } else if (e.name === "🥗 盛果期") {
        value = this.pppms[3];
      }
      this.$emit("select", {
        process: e.name,
        name: this.pname,
        ppms: this.pppms,
        value: value,
      });
    },
  },
  mounted() {
    this.desc = "选择 " + this.name + " 将要运行的阶段";
    this.pname = this.name;
    this.pppms = this.ppms;
  },
};
</script>
<style>
.wiki-card {
  background-color: white;
  margin-bottom: 20px;
  border-radius: 8px;
  padding: 10px;
  height: 140px;
}

.wiki-card-img {
  float: left;
}

.wiki-card-img .van-image__img {
  border-radius: 8px;
}

.wiki-content {
  /* background: lightcoral; */
  margin-left: 110px;
  height: 100%;
}

.wiki-content-title {
  /* background: lightblue; */
  font-weight: bold;
  color: lightslategray;
  font-size: 19px;
}

.wiki-content-text {
  /* background: lime; */
  font-weight: bold;
  color: lightslategray;
  font-size: 12px;
}
</style>