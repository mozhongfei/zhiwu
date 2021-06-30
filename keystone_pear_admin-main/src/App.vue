<template>
  <v-app>
    <router-view style="margin-bottom: 50px"></router-view>

    <van-tabbar
      v-model="tabbar_active"
      active-color="#32BAC0"
      inactive-color="#979797"
      @click.native="onChange"
    >
      <van-tabbar-item badge="1" to="/home">
        <span style="font-weight: bold">主页</span>
        <template #icon="props">
          <img :src="props.active ? icon_home.active : icon_home.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item badge="" to="/dash">
        <span style="font-weight: bold">监控台</span>
        <template #icon="props">
          <img :src="props.active ? icon_data.active : icon_data.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item badge="" to="/wiki">
        <span style="font-weight: bold">自动化</span>
        <template #icon="props">
          <img :src="props.active ? icon_wiki.active : icon_wiki.inactive" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item badge="3" to="/me">
        <span style="font-weight: bold">我的</span>
        <template #icon="props">
          <img :src="props.active ? icon_me.active : icon_me.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </v-app>
</template>

<script>
// import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {},
  data() {
    return {
      tabbar_active: 0,
      icon_home: {
        active: require("@/assets/icon_home_active.png"),
        inactive: require("@/assets/icon_home_inactive.png"),
      },
      icon_data: {
        active: require("@/assets/icon_data_active.png"),
        inactive: require("@/assets/icon_data_inactive.png"),
      },
      icon_me: {
        active: require("@/assets/icon_me_active.png"),
        inactive: require("@/assets/icon_me_inactive.png"),
      },
      icon_wiki: {
        active: require("@/assets/icon_wiki_active.png"),
        inactive: require("@/assets/icon_wiki_inactive.png"),
      },
      isDoubleFirst: false,
    };
  },
  methods: {
    onChange() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top === 0) {
        return;
      }
      if (this.isDoubleFirst) {
        console.log("[INFO] navigation dblclick");
        this.backTopAnimation();
      }
      this.isDoubleFirst = true;
      setTimeout(() => {
        this.isDoubleFirst = false;
      }, 500);
    },
    backTopAnimation() {
      console.log("[INFO] TopAnimation start");
      let timer = setInterval(() => {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        let increase = top - 40;
        document.documentElement.scrollTop = document.body.scrollTop = increase;
        if (top <= 0) {
          clearInterval(timer);
          console.log("[INFO] TopAnimation end");
        }
      }, 15);
    },
    afterRead(e) {
      this.onUploadFile(e.file, 1, 6, 7);
    },
    onUploadFile(file, major, minor, patch) {
      let forms = new FormData();
      let configs = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      forms.append("file", file);
      this.axios
        .post(
          "http://1.116.192.198:2999/upload/pear?major=" +
            major +
            "&minor=" +
            minor +
            "&patch=" +
            patch,
          forms,
          configs
        )
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
}
</style>
