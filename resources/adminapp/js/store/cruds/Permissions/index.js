import * as fb from '../../../firebase'
import * as admin from 'firebase-admin'

const set = key => (state, val) => {
  state[key] = val
}

function initialState() {
  return {
    data: [],
    total: 0,
    query: {},
    loading: false
  }
}

const route = 'permissions'

const getters = {
  data: state => state.data,
  total: state => state.total,
  loading: state => state.loading
}

const actions = {
  fetchIndexData({ commit, state }) {
    commit('setLoading', true)
    let permissionsData = [];

    fb.permissionsCollection.get().then(response => {
      response.forEach((doc) => {
        permissionsData.push({
           id: doc.id,
           title: doc.data().title,
           created_at: doc.data().created_at
         });
      });
      const results = permissionsData;
      const total = permissionsData.length;
      commit('setData', results)
      commit('setTotal', total )
      })
      .catch(error => {
        message = error.response.data.message || error.message
        // TODO error handling
      })
      .finally(() => {
        commit('setLoading', false)
      })
  },
  destroyData({ commit, state, dispatch }, id) {
    axios
      .delete(`${route}/${id}`)
      .then(response => {
        dispatch('fetchIndexData')
      })
      .catch(error => {
        message = error.response.data.message || error.message
        // TODO error handling
      })
  },
  setQuery({ commit }, value) {
    commit('setQuery', _.cloneDeep(value))
  },
  resetState({ commit }) {
    commit('resetState')
  }
}

const mutations = {
  setData: set('data'),
  setTotal: set('total'),
  setQuery(state, query) {
    query.page = (query.offset + query.limit) / query.limit
    state.query = query
  },
  setLoading: set('loading'),
  resetState(state) {
    Object.assign(state, initialState())
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
