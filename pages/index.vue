<template>
  <div class="m-8">
    <div v-for="tale of gTales" :key="tale.no">
      <div class="p-2">
        <div class="flex">
          <div class="mr-2">{{ `00${tale.no}`.slice(-3) }}</div>
          <div class="mr-2">{{ tale.title }}</div>
          <div class="mr-2">{{ tale.area }}</div>
          <div class="mr-2">{{ tale.weather }}</div>
          <div class="mr-2">{{ tale.timeStart }} 〜 {{ tale.timeEnd }}</div>
          <div class="mr-2">X: {{ tale.posX }} Y: {{ tale.posY }}</div>
          <div class="mr-2">{{ tale.emote }}</div>
        </div>
        <div class="flex">
          <div
            v-for="(c, idx) of tale.cells"
            :key="idx"
            class="p-1 mr-1 border text-xs flex-shrink-0"
            :class="{ 'bg-yellow-300': c.chance }"
          >
            <div :class="{ 'text-indigo-500': c.matchWeather }">
              {{ c.weather }}
            </div>
            <div class="hhmm" :class="{ 'text-indigo-500': c.matchHour }">
              <code>ET {{ c.startET }}</code>
            </div>
            <div class="hhmm">
              <code>LT {{ c.startLT }}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      gCells: 'tales/gCells',
      gTales: 'tales/gTales',
    }),
  },
  mounted() {
    this.$store.dispatch('tales/init')
  },
}
</script>

<style scoped>
.hhmm {
  font-size: 0.7em;
}
</style>
