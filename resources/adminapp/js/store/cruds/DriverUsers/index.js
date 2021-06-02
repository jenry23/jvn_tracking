import { result } from 'lodash'
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
  
  const route = 'driver-users'
  
  
  const getters = {
    data: state => state.data,
    total: state => state.total,
    loading: state => state.loading
  }
  
  const actions = {
    fetchIndexData({ commit, state }) {
      commit('setLoading', true)
      let driversData = [];

      fb.driversCollection.get().then(response => {
        response.forEach((doc) => {
          driversData.push({
             id: doc.id,
             address: doc.data().address,
             birthday: doc.data().birthday,
             civil_status: doc.data().civil_status,
             gender: doc.data().gender,
             mobile_no: doc.data().mobile_no,
             name: doc.data().name,
             user_account_id: doc.data().user_account_id,
           });
        });
        const results = driversData;
        const total = driversData.length;
        commit('setData', results)
        commit('setTotal', total )
       }).catch(error => {
          message = error.response.data.message || error.message
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    destroyData({ commit, state, dispatch }, id) {
      fb.driversCollection.doc(id).delete().then(response => {
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
  