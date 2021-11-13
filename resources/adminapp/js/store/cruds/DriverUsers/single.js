import * as fb from '../../../firebase'

function initialState() {
    return {
      entry: {
        id:null,
        name: '',
        birthday: '',
        address: '',
        gender: '',
        mobile_no: '',
        created_at: '',
      },
      lists: {
        gender: []
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

        fb.driversCollection.add(state.entry).then(response => {
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
    setBirthday({ commit }, value) {
        commit('setBirthday', value)
    },
    setUserAccountID({ commit }, value){
      commit('setUserAccountID',value)
    },
    setAddress({ commit }, value) {
        commit('setAddress', value)
    },
    setGender({ commit }, value) {
        commit('setGender', value)
    },
    setMobileNo({ commit }, value) {
        commit('setMobileNo', value)
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
      fb.driversCollection.doc(id).get().then(response => {
           commit('setEntry',response.data())
      })
    },
    fetchShowData({ commit, dispatch }, id) {
      fb.driversCollection.doc(id).get().then(response => {
        commit('setEntry',response.data())
     })
    },
    fetchCreateData({ commit }) {
      let genderData = [];
      fb.genderCollection.get().then(response => {
        response.forEach((doc) => {
          genderData.push({name: doc.data().name});
        })
        const result = {
          gender : genderData
        }
        commit('setList', result)
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
    setGender(state, value) {
        state.entry.gender = value
    },
    setUserAccountID(state, value) {
      state.entry.user_account_id = value
    },
    setMobileNo(state, value) {
        state.entry.mobile_no = value
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
    setList(state, lists) {
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
