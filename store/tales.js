import Adventure from '@/utils/Adventure'
import talesDataset from './tales.json'

export const state = () => ({
  cells: [],
  entries: [],
})

export const getters = {
  gCells(state) {
    return state.cells
  },
  gTales(state) {
    return state.entries
  },
}

export const mutations = {
  SET_Cells(state, cells) {
    state.cells = cells
  },
  SET_Entries(state, entries) {
    state.entries = entries
  },
}

export const actions = {
  init({ commit }) {
    const dt = new Date()
    const tales = talesDataset.slice()
    for (const tale of tales) {
      const cells = Adventure.createTimeCells(dt)
      for (const cell of cells) {
        cell.weather = Adventure.getWeather(tale.zone, cell.startRealDate)
        cell.matchWeather = Adventure.matchCellWeather(cell, tale)
        cell.matchHour = Adventure.matchCellHour(cell, tale)
        cell.chance = cell.matchWeather && cell.matchHour
      }
      tale.cells = cells
    }
    commit('SET_Entries', tales)
  },
}
