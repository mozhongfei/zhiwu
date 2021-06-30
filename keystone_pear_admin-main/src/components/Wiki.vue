<template>
  <div class="wiki">
    <van-nav-bar fixed title="百科与自动化" />
    <div class="wiki-bg" :style="bg_wiki">
      <div class="now-style">
        <div class="wiki-auto-title">自动化运行(光照/水量)</div>
        <div class="wiki-auto-tip">当前状态： {{ this.$root.rhMode }}</div>
        <div class="wiki-auto-tip">
          当前阈值区间(Time)： {{ this.$root.light }}
        </div>
        <div style="height: 20px"></div>
        <van-slider
          @change="changeSliderLight"
          step="1"
          range
          min="0"
          max="23"
          style="margin: 0px"
          v-model="$root.light"
          bar-height="4px"
          active-color="#ee0a24"
        />
        <div style="height: 30px"></div>
        <div style="height: 30px">
          <div class="wiki-auto-tip" style="float: left">浇水量(L) :</div>
          <van-stepper style="float: right" v-model="value" integer min="0" />
        </div>
      </div>
      <div class="now-style">
        <div class="wiki-auto-title">自动化运行(湿度)</div>
        <div class="wiki-auto-tip">当前状态： {{ this.$root.rhMode }}</div>
        <div class="wiki-auto-tip">当前阈值区间(RH)： {{ this.$root.rh }}</div>
        <div style="height: 20px"></div>
        <van-slider
          @change="changeSlider"
          step="1"
          range
          style="margin: 0px"
          v-model="$root.rh"
          bar-height="4px"
          active-color="#ee0a24"
        />
        <div style="height: 20px"></div>
      </div>
      <div class="now-style">
        <div class="wiki-auto-title">自动化方案(百科)</div>
        <div class="wiki-auto-tip">当前状态： {{ this.$root.ccsMode }}</div>
        <div class="wiki-auto-tip">当前方案： {{ this.$root.name }}</div>
        <div class="wiki-auto-tip">
          当前阶段： {{ this.$root.process }}
          <span v-if="ppmValue !== 0"> ({{ ppmValue }} ppm)</span>
        </div>
      </div>
      <div class="wikis">
        <WikiCard :ppms="ppms0" :name="name0" @select="onSelect"></WikiCard>
        <WikiCard :ppms="ppms1" :name="name1" @select="onSelect"></WikiCard>
        <WikiCard :ppms="ppms2" :name="name2" @select="onSelect"></WikiCard>
        <WikiCard :ppms="ppms3" :name="name3" @select="onSelect"></WikiCard>
        <WikiCard :ppms="ppms4" :name="name4" @select="onSelect"></WikiCard>
        <WikiCard :ppms="ppms5" :name="name5" @select="onSelect"></WikiCard>
        <WikiCard :ppms="ppms6" :name="name6" @select="onSelect"></WikiCard>
        <WikiCard :ppms="ppms7" :name="name7" @select="onSelect"></WikiCard>
        <WikiCard :ppms="ppms8" :name="name8" @select="onSelect"></WikiCard>
        <WikiCard :ppms="ppms9" :name="name9" @select="onSelect"></WikiCard>
        <WikiCard :ppms="ppms10" :name="name10" @select="onSelect"></WikiCard>
      </div>
      <div class="wiki-footer">
        <div>Copyright © 2017 - 2020 r3inbowari.</div>
        <div>All Rights Reserved.</div>
        <div>Contact: 34787894(QQ)</div>
      </div>
    </div>
  </div>
</template>

<script>
import WikiCard from "@/components/WikiCard.vue";

export default {
  components: {
    WikiCard,
  },
  data() {
    return {
      value: 10,
      ppmValue: 0,
      name0: "🥒 黄瓜",
      name1: "🌶 辣椒",
      name2: "🍉 西瓜",
      name3: "🍅 西红柿",
      name4: "❀ 观赏花",
      name5: "🥔 土豆",
      name6: "🍓 草莓",
      name7: "🍇 葡萄",
      name8: "🍄 蘑菇",
      name9: "🥦 西兰花",
      name10: "🥕 胡萝卜",
      ppms0: [1500, 2500, 3500, 4500, 1200, 2200, 3400, 4500],
      ppms1: [1500, 3000, 3800, 4600, 1500, 2500, 3500, 4500],
      ppms2: [1500, 2600, 3700, 4800, 1500, 2500, 3500, 4500],
      ppms3: [1200, 2200, 3400, 5100, 1500, 3400, 5100, 1500],
      ppms4: [900, 1000, 1200, 1300, 1200, 2600, 3600, 4500],
      ppms5: [1800, 2900, 4200, 3800, 1500, 2600, 3500, 4500],
      ppms6: [1200, 2600, 3600, 4600, 1500, 2500, 1000, 4500],
      ppms7: [1400, 2800, 4100, 5500, 1500, 2500, 3500, 4500],
      ppms8: [800, 1200, 1200, 1600, 1500, 2500, 3500, 4500],
      ppms9: [1400, 2900, 4200, 4900, 1500, 2500, 3500, 4500],
      ppms10: [1200, 2300, 3400, 4800, 1500, 2500, 3500, 4500],
      bg_wiki: {
        backgroundImage: "url(" + require("@/assets/bg_home.jpg") + ")",
        // backgroundImage: "url(https://i.loli.net/2020/11/25/lMbPkBIu1Ae6pTn.jpg",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
    };
  },
  methods: {
    changeSlider(e) {
      if (e[0] === e[1]) {
        this.$root.rh[1]++;
      }
      if (this.$root.rhMode === "联动模式") {
        this.$root.openRHTask();
      }
    },
    changeSliderLight(e) {
      if (e[0] === e[1]) {
        this.$root.light[1]++;
      }
      if (this.$root.lightMode === "联动模式") {
        this.$root.openLightTask();
      }
    },
    onSelect(e) {
      this.$root.name = e.name;
      this.$root.process = e.process;
      this.$notify({ type: "success", message: "操作成功" });
      this.ppmValue = e.value;
      this.$root.openCSSTask(e.value);
    },
  },
};
</script>

<style scoped>
.wiki-bg {
  margin-top: 46px;
  padding: 20px;
}

.now-style {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
}

.wiki-auto-title {
  color: black;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 8px;
}

.wiki-auto-tip {
  color: #979797;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
}

.wiki-footer {
  margin-top: 30px;
  text-align: center;
}
</style>