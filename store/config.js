export const state = () => ({
  complete: {},
})

export const getters = {
  gComplete(state) {
    return state.complete
  },
}

export const mutations = {
  SET_Complete(state, NoNNN) {
    const newBool = !state.complete[NoNNN]
    state.complete = { ...state.complete, [NoNNN]: newBool }
  },
}

export const actions = {
  refresh() {
    //
  },
  toggleComplete({ commit }, payload) {
    const NoNNN = 'No' + `00${Number(payload)}`.slice(-3)
    commit('SET_Complete', NoNNN)
  },
}
