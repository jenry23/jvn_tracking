import * as fb from '../../../firebase'

function initialState() {
    return {
      entry: {
        name: '',
        address: '',
        tag: '',
        longitude: '',
        latitude: ''
      },
      lists: {
        tag:[],
        genders: []
      },
      loading: false

    }
  }

  const route = 'driver-users'

  const getters = {
    entry: state => state.entry,
    lists: state => state.lists,
    loading: state => state.loading
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
        fb.locationsCollection.doc(state.entry.name).set(state.entry).then(response => {
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
        let params = objectToFormData(state.entry, {
          indices: true,
          booleansAsIntegers: true
        })
        params.set('_method', 'PUT')
        axios
          .post(`${route}/${state.entry.id}`, params)
          .then(response => {
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
    setName({ commit }, value) {
      commit('setName', value)
    },
    setAddress({ commit }, value) {
        commit('setAddress', value)
    },
    setTag({ commit }, value) {
      commit('setTag', value)
    },
    setLatitude({ commit }, value) {
      commit('setLatitude', value)
    },
    setLongitude({ commit }, value) {
      commit('setLongitude', value)
    },
    fetchEditData({ commit, dispatch }, id) {
      fb.driversCollection.doc(id).get().then(response => {
           commit('setEntry',response.data())
      })
    },
    fetchShowData({ commit, dispatch }, id) {
      fb.locationsCollection.doc(id).get().then(response => {
        commit('setEntry',response.data())
     })
    },
    fetchCreateData({ commit }) {
      let tagData = [];

      fb.tagCollection.get().then(response => {
        response.forEach((doc) => {
          tagData.push({
            id: doc.id,
            name: doc.data().name,
          });
        })
        const list = {
          tag: tagData
        }
        commit('setLists', list)
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
    setName(state, value) {
      state.entry.name = value
    },
    setBirthday(state, value) {
        state.entry.birthday = value
    },
    setAddress(state, value) {
        state.entry.address = value
    },
    setTag(state,value){
      state.entry.tag = value
    },
    setLatitude(state,value){
      state.entry.latitude = value
    },
    setLongitude(state,value){
      state.entry.longitude = value
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setLists(state, lists) {
      state.lists = lists
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
