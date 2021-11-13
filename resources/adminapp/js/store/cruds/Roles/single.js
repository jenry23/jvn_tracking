import * as fb from '../../../firebase'

function initialState() {
  return {
    entry: {
      title: '',
      permissions: [],
      companyID: [],
    },
    lists: {
      permissions: [],
      companyID:[]
    },
    loading: false
  }
}

const route = 'roles'

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
      var dataList = {
        companyID: state.entry.companyID.id,
        title: state.entry.title,
        permissions: state.entry.permissions
      }
      fb.rolesCollection.doc(state.entry.title).set(dataList).then(response => {
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
  setTitle({ commit }, value) {
    commit('setTitle', value)
  },
  setCompanyID({ commit }, value) {
    commit('setCompanyID', value)
  },
  setPermissions({ commit }, value) {
    commit('setPermissions', value)
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
  fetchCreateData({ commit }) {
    var permissionList = []
    var companyList = []

    fb.permissionsCollection.get().then(response => {
      response.forEach((doc) => {
        permissionList.push({
          id: doc.id,
          title: doc.data().title,
        });
      });
    })

    fb.companyCollection.get().then(response =>{
      response.forEach((doc) => {
        companyList.push({
            id:doc.id,
            company_name: doc.data().company_name
          })
        })
      const lists = {
        companyID : companyList,
        permissions: permissionList
      }
      commit('setLists', lists)
    })
  },
  fetchEditData({ commit, dispatch }, id) {
    axios.get(`${route}/${id}/edit`).then(response => {
      commit('setEntry', response.data.data)
      commit('setLists', response.data.meta)
    })
  },
  fetchShowData({ commit, dispatch }, id) {
    axios.get(`${route}/${id}`).then(response => {
      commit('setEntry', response.data.data)
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
  setCompanyID(state,value){
    state.entry.companyID = value
  },
  setTitle(state, value) {
    state.entry.title = value
  },
  setPermissions(state, value) {
    state.entry.permissions = value
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
  setLists(state, lists) {
    state.lists = lists
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
