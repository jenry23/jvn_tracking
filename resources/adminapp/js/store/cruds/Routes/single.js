import * as fb from '../../../firebase'

function initialState() {
    return {
      entry: {
        origin: '',
        pitstops: '',
        destination: '',
      },
      lists :{
          vehicleID: []
      },
      loading: false
    }
  }

  const route = 'routes'

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
        const arrayPit = []
        const pitsopsArray = state.entry.pitstops;
        pitsopsArray.forEach((doc)=>{
            arrayPit.push(doc.id)
        });
        const id = state.entry.origin.id+"."+state.entry.destination.id;
        const dataArray = {
            origin: state.entry.origin.id,
            destination:state.entry.destination.id,
            pitstops:arrayPit
        };
        fb.routesCollection.doc(id).set(dataArray).then(response => {
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
    setOrigin({ commit }, value) {
      commit('setOrigin', value)
    },
    setDestination({ commit }, value){
      commit('setDestination',value)
    },
    setPitstops({ commit }, value) {
        commit('setPitstops', value)
    },
    fetchCreateData({commit,dispatch}){
        let locationList = []

        fb.locationsCollection.get().then(response => {
            response.forEach((doc) => {
                locationList.push({
                   id: doc.id,
                   address: doc.data().address,
                   name: doc.data().name,
            });
         });

        const list = {
          origin : locationList,
          destination : locationList,
          pitstops : locationList
        }
        console.log(list)
          commit('setList',list)
      });
    },
    fetchEditData({ commit, dispatch }, id) {
      fb.vehiclesCollection.doc(id).get().then(response => {
        commit('setEntry',response.data())
      })
    },
    fetchShowData({ commit, dispatch }, id) {
      fb.routesCollection.doc(id).get().then(response => {
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
    setList(state, lists){
        state.lists = lists
    },
    setOrigin(state, value) {
      state.entry.origin = value
    },
    setDestination(state,value){
      state.entry.destination = value;
    },
    setPitstops(state, value) {
      state.entry.pitstops = value
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
