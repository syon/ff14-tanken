<template>
  <div class="m-8">
    <div v-for="tale of taleRecords" :key="tale.no">
      <div class="p-2">
        <div :class="{ 'text-gray-500': tale.completed }">
          <input
            v-model="tale.completed"
            type="checkbox"
            @click="handleCheckbox(tale)"
          />
          <span class="mr-2">{{ `00${tale.no}`.slice(-3) }}</span>
          <span class="mr-2">{{ tale.title }}</span>
          <span class="mr-2">{{ tale.area }}</span>
          <span class="mr-2">{{ tale.weather }}</span>
          <span class="mr-2">{{ tale.timeStart }} 〜 {{ tale.timeEnd }}</span>
          <span class="mr-2">X: {{ tale.posX }} Y: {{ tale.posY }}</span>
          <span class="mr-2">{{ tale.emote }}</span>
        </div>
        <div v-if="!tale.completed" class="flex">
          <div
            v-for="(c, idx) of tale.cells"
            :key="idx"
            class="p-1 mr-1 border text-xs flex-shrink-0"
            :class="{ 'bg-yellow-300': c.chance, 'opacity-25': c.isPast }"
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
      gTales: 'tales/gTales',
      gComplete: 'config/gComplete',
    }),
    taleRecords() {
      return this.gTales.map((x) => {
        const NoNNN = 'No' + `00${Number(x.no)}`.slice(-3)
        x.completed = this.gComplete[NoNNN]
        return x
      })
    },
  },
  mounted() {
    this.$store.dispatch('tales/init')
  },
  methods: {
    handleCheckbox(tale) {
      this.$store.dispatch('config/toggleComplete', tale.no)
    },
  },
}
</script>

<style scoped>
.hhmm {
  font-size: 0.7em;
}
</style>
