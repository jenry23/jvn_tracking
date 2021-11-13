import * as fb from '../../../firebase'

function initialState() {
  return {
    entry: {
      company_name: '',
      company_code: '',
      company_address: '',
      company_website: '',
      company_email: '',
      created_at: ''
    },
    loading: false
  }
}

const route = 'contact-companies'

const getters = {
  entry: state => state.entry,
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

      fb.companyCollection.doc(state.entry.company_code).set(state.entry).then(response => {
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
  setCompanyName({ commit }, value) {
    commit('setCompanyName', value)
  },
  setCompanyCode({ commit }, value) {
    commit('setCompanyCode', value)
  },
  setCompanyAddress({ commit }, value) {
    commit('setCompanyAddress', value)
  },
  setCompanyWebsite({ commit }, value) {
    commit('setCompanyWebsite', value)
  },
  setCompanyEmail({ commit }, value) {
    commit('setCompanyEmail', value)
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
    axios.get(`${route}/${id}/edit`).then(response => {
      commit('setEntry', response.data.data)
    })
  },
  fetchShowData({ commit, dispatch }, id) {
    fb.companyCollection.doc(id).get().then(response => {
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
  setCompanyName(state, value) {
    state.entry.company_name = value
  },
  setCompanyCode(state, value) {
    state.entry.company_code = value
  },
  setCompanyAddress(state, value) {
    state.entry.company_address = value
  },
  setCompanyWebsite(state, value) {
    state.entry.company_website = value
  },
  setCompanyEmail(state, value) {
    state.entry.company_email = value
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
