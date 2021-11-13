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

  const route = 'routes'


  const getters = {
    data: state => state.data,
    total: state => state.total,
    loading: state => state.loading
  }

  const actions = {
    fetchIndexData({ commit, state }) {
      commit('setLoading', true)
      let routesData = [];

      fb.routesCollection.onSnapshot((response) => {
        response.forEach((doc) => {
          routesData.push({
             id: doc.id,
             pitstops: doc.data().pitstops,
             origin: doc.data().origin,
             destination: doc.data().destination,
           });
        });
        const results = routesData;
        const total = routesData.length;
        commit('setData', results)
        commit('setTotal', total )
        commit('setLoading', false)
       },(error) => {
        message = error.response.data.message || error.message
        // TODO error handling
        console.log('error');
      })
    },
    destroyData({ commit, state, dispatch }, id) {
      fb.routesCollection.doc(id).delete().then(response => {
          dispatch('fetchIndexData')
        })
        .catch(error => {
          message = error.response.data.message || error.message
          // TODO error handling
        })
    },
    destroyData({ commit, state, dispatch }, id) {
      fb.routesCollection.doc(id).delete().then(response => {
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
