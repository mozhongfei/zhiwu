<template>
  <div class="dash-card">
    <v-card class="mx-auto text-center" color="green" dark max-width="600">
      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :value="value"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">
              {{ item.value }}
            </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-card-text>
        <div class="display-1 font-weight-thin">{{ na }}{{ unit }}</div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <v-btn block text @click="goSensor"> 前往详细页面 </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: Array,
    unit: String,
    id: String,
    type: String,
    na: String,
  },
  data: () => ({
    // value: [423, 446, 675, 510, 590, 610, 760],
  }),
  methods: {
    goSensor() {
      this.$router.push({
        name: "Sensor",
        params: { id: this.id, type: this.type, name: this.name },
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.dash-card {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
}
</style>