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
  
  const route = 'vehicle'
  
  const getters = {
    data: state => state.data,
    total: state => state.total,
    loading: state => state.loading
  }
  
  const actions = {
    fetchIndexData({ commit, state }) {
      commit('setLoading', true)

      let vehiclesData = [];  
      fb.vehiclesCollection.get().then(response => {
        response.forEach((doc) => {
          vehiclesData.push({
             id: doc.id,
             owner: doc.data().owner,
             brand_name: doc.data().brand_name,
             or_no: doc.data().or_no,
             cr_no: doc.data().cr_no,
             plate_no: doc.data().plate_no,
             max_passenger: doc.data().max_passenger,
             user_account_id: doc.data().user_account_id,
           });
        });
        const results = vehiclesData;
        console.log(results);
        const total = vehiclesData.length;
        commit('setData', results)
        commit('setTotal', total )
        }).catch(error => {
          message = error.response.data.message || error.message
          // TODO error handling
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    destroyData({ commit, state, dispatch }, id) {
         fb.vehiclesCollection.doc(id).delete().then(response => {
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
  