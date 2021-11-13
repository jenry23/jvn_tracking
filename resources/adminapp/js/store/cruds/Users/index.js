import * as fb from '../../../firebase'

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

const route = 'users'

const getters = {
  data: state => state.data,
  total: state => state.total,
  loading: state => state.loading
}

const actions = {
  fetchIndexData({ commit, state }) {
    commit('setLoading', true)

    var usersData = []

    fb.usersCollection.get().then(response => {
      response.forEach((doc) => {
        usersData.push({
           id: doc.id,
           email: doc.data().email,
           name: doc.data().name,
           roles: doc.data().roles,
           status: doc.data().status,
           user_id: doc.data().user_id
         });
      });
      const results = usersData;
      const total = usersData.length;
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
