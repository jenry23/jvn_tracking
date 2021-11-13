import * as fb from '../../../firebase'

function initialState() {
    return {
      entry: {
        owner: '',
        brand_name: '',
        or_no: '',
        cr_no: '',
        plate_no: '',
        max_passenger: '',
        created_at: new Date(),
        updated_at: '',
        deleted_at: ''
      },
      lists :{
          vehicleID: []
      },
      loading: false
    }
  }

  const route = 'vehicle'

  const getters = {
    entry: state => state.entry,
    loading: state => state.loading,
    lists: state => state.lists
  }

  const actions = {
    storeData({ commit, state, dispatch }) {
      commit('setLoading', true)
      dispatch('Alert/resetState', null, { root: true })

      return new Promise((resolve, reject) => {
        let params = objectToFormData(state.entry, {
          indices: true,
          booleansAsIntegers: true
        })

        fb.vehiclesCollection.doc(state.entry.plate_no).set(state.entry).then(response => {
            resolve(response)
          })
          .catch(error => {
            let message = error.response.data.message || error.message
            let errors = error.response.data.errors

            dispatch(
              'Alert/setAlert',
              { message: message, errors: errors, color: 'danger' },
              { root: true }
            )

            reject(error)
          })
          .finally(() => {
            commit('setLoading', false)
          })
      })
    },
    updateData({ commit, state, dispatch }) {
      commit('setLoading', true)
      dispatch('Alert/resetState', null, { root: true })

      return new Promise((resolve, reject) => {
        fb.vehiclesCollection.doc(state.entry.plate_no).update(state.entry).then(response => {
            resolve(response)
          })
          .catch(error => {
            let message = error.response.data.message || error.message
            let errors = error.response.data.errors

            dispatch(
              'Alert/setAlert',
              { message: message, errors: errors, color: 'danger' },
              { root: true }
            )

            reject(error)
          })
          .finally(() => {
            commit('setLoading', false)
          })
      })
    },
    setOwner({ commit }, value) {
      commit('setOwner', value)
    },
    setMaxPassenger({ commit }, value){
      commit('setMaxPassenger',value)
    },
    setBrandName({ commit }, value) {
        commit('setBrandName', value)
    },
    setOrNo({ commit }, value) {
     commit('setOrNo', value)
    },
    setCrNo({ commit }, value) {
     commit('setCrNo', value)
    },
    setPlateNo({ commit }, value) {
      commit('setPlateNo', value)
    },
    setCreatedAt({ commit }, value) {
      commit('setCreatedAt', value)
    },
    setUpdatedAt({ commit }, value) {
      commit('setUpdatedAt', value)
    },
    setDeletedAt({ commit }, value) {
      commit('setDeletedAt', value)
    },
    fetchEditData({ commit, dispatch }, id) {
      fb.vehiclesCollection.doc(id).get().then(response => {
        commit('setEntry',response.data())
      })
    },

    fetchShowData({ commit, dispatch }, id) {
      fb.vehiclesCollection.doc(id).get().then(response => {
        commit('setEntry',response.data())
     })
    },
    resetState({ commit }) {
      commit('resetState')
    }
  }

  const mutations = {
    setEntry(state, entry) {
      state.entry = entry
    },
    setOwner(state, value) {
      state.entry.owner = value
    },
    setMaxPassenger(state,value){
      state.entry.max_passenger = value;
    },
    setBrandName(state, value) {
      state.entry.brand_name = value
    },
    setOrNo(state, value) {
     state.entry.or_no = value
    },
    setCrNo(state, value) {
        state.entry.cr_no = value
    },
    setPlateNo(state, value) {
      state.entry.plate_no = value
    },
    setCreatedAt(state, value) {
      state.entry.created_at = value
    },
    setUpdatedAt(state, value) {
      state.entry.updated_at = value
    },
    setDeletedAt(state, value) {
      state.entry.deleted_at = value
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    resetState(state) {
      state = Object.assign(state, initialState())
    }
  }

  export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
  }
