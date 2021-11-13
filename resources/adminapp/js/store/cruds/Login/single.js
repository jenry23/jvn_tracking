import * as fb from '../../../firebase'

function initialState() {
    return {
      entry: {
        email: '',
        password: '',
      },
      loading: false
    }
  }

  const route = 'login'

  const getters = {
    entry: state => state.entry,
    loading: state => state.loading
  }

  const actions = {
    LoginData({ commit, state, dispatch }) {
      commit('setLoading', true)
      dispatch('Alert/resetState', null, { root: true })

      return new Promise((resolve, reject) => {
        let params = objectToFormData(state.entry, {
          indices: true,
          booleansAsIntegers: true
        })

        fb.auth.signInWithEmailAndPassword(state.entry.email,state.entry.password)
          .then(response => {
            resolve(response)
          })
          .catch(function(error) {
            let message = error.message || error.message
            let errors = error.code

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
    setEmail({ commit }, value) {
      commit('setEmail', value)
    },
    setPassword({ commit }, value) {
      commit('setPassword', value)
    },
    resetState({ commit }) {
      commit('resetState')
    }
  }

  const mutations = {
    setEntry(state, entry) {
      state.entry = entry
    },
    setEmail(state, value) {
      state.entry.email = value
    },
    setPassword(state, value) {
      state.entry.password = value
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
