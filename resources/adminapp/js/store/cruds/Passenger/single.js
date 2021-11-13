import * as fb from '../../../firebase'

function initialState() {
    return {
      entry: {
        id: '',
        name: '',
        address: '',
        qrcodeSrc: '',
      },
      loading: false

    }
  }

  const route = 'passenger'

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

        var name = state.entry.name
        var address = state.entry.address

        fb.passengerCollection.add({
          name : name,
          address: address,
        }).then(function(docRef) {
          commit('setId',docRef.id)
        }).then(response =>{
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
            let canvas = document.querySelector('#qriously canvas')
            let imgSrc = canvas.toDataURL('image/png')
            let id = state.entry.id;
            var storageRef = fb.db_storage.ref(id + '.jpg')
            storageRef.putString(imgSrc, 'data_url').then(response => {
              response.ref.getDownloadURL().then(url => {
                  fb.passengerCollection.doc(id).update({
                    imgUrl:url
                  })
              })
            })
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
        fb.passengerCollection.doc(state.entry.id).update({
          name : state.entry.name,
          address: state.entry.address,
        }).then(response => {
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
    setQrCode( { commit },value){
      commit('setQrCode',value)
    },
    setName({ commit }, value) {
      commit('setName', value)
    },
    setBirthday({ commit }, value) {
        commit('setBirthday', value)
    },
    setId({ commit }, value) {
      commit('setId', value)
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
    setCivilStatus({ commit }, value) {
        commit('setCivilStatus', value)
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
      fb.passengerCollection.doc(id).get().then(response => {
           commit('setEntry',response.data())
      })
    },
    fetchShowData({ commit, dispatch }, id) {
      fb.passengerCollection.doc(id).get().then(response => {
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
    setId(state,value){
      state.entry.id = value
    },
    setQrCode(state,value){
      state.entry.qrcodeSrc = value
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
    setCivilStatus(state, value) {
        state.entry.civil_status = value
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
