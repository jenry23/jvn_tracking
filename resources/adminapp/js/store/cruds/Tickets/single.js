import * as fb from '../../../firebase'

function initialState() {
    return {
      entry: {
        vehicleID: [],
        startTime: '',
        endTime: '',
        routeID: [],
        typeID:[],
        passengerID: [],
        driverID: [],
        status: 'Pending',
        created_at: new Date(),
      },
      lists :{
          vehicleID: [],
          typeID:[],
          routeID: [],
          passengerID: [],
          driverID: [],
      },
      loading: false
    }
  }

  const route = 'tickets'

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
        const dataList = {
            date:state.entry.created_at,
            driverID: state.entry.driverID.id,
            routeID: state.entry.routeID.id,
            vehicleID: state.entry.vehicleID.id,
            passengerID: state.entry.vehicleID,
            status:state.entry.status,
            passengerID: state.entry.passengerID,
            startTime: state.entry.startTime,
            endTime:state.entry.endTime,
          };
        fb.ticketsCollection.doc(state.entry.routeID.id).set(dataList).then(response => {
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
    setVehicleID({ commit }, value) {
      commit('setVehicleID', value)
    },
    setTypeID({ commit }, value) {
      commit('setTypeID', value)
    },
    setPassenger({ commit }, value) {
      commit('setPassenger', value)
    },
    setRouteID({ commit }, value){
      commit('setRouteID',value)
    },
    setStartTime({ commit }, value) {
        commit('setStartTime', value)
    },
    setEndTime({ commit }, value) {
     commit('setEndTime', value)
    },
    setStatus({ commit }, value) {
     commit('setStatus', value)
    },
    setDriverID({ commit }, value) {
      commit('setDriverID', value)
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
    fetchCreatedData({commit,dispatch}){
        let vehicleList = []
        let routeList = []
        let driverList = []
        let passengerList = []

        let typeList = [{name:"Incoming"},{ name:"Outgoing"}]
        fb.vehiclesCollection.get().then(response => {
            response.forEach((doc) => {
                vehicleList.push({
                   id: doc.id,
                   brand_name: doc.data().brand_name,
            });
         });
        fb.routesCollection.get().then(response => {
          response.forEach((doc) => {
            routeList.push({
                 id: doc.id,
                 destination: doc.data().destination,
                 origin: doc.data().origin,
            });
          });

        fb.driversCollection.get().then(response => {
            response.forEach((doc) => {
              driverList.push({
                   id: doc.id,
                   name: doc.data().name,
                   address: doc.data().address,
              });
         });

         fb.passengerCollection.get().then(response => {
          response.forEach((doc) => {
            passengerList.push({
                 id: doc.id,
                 name: doc.data().name,
                 pickup: false
            });
         });

        const list = {
          vehicleID : vehicleList,
          routeID : routeList,
          driverID : driverList,
          passengerID : passengerList,
          typeID: typeList
        }
        console.log(list)
          commit('setList',list)
          });
        });
        });
      });
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
    setList(state, lists){
        state.lists = lists
    },
    setVehicleID(state, value) {
      state.entry.vehicleID = value
    },
    setRouteID(state,value){
      state.entry.routeID = value;
    },
    setTypeID(state,value){
      state.entry.typeID = value;
    },
    setStartTime(state, value) {
      state.entry.startTime = value
    },
    setEndTime(state, value) {
     state.entry.endTime = value
    },
    setStatus(state, value) {
        state.entry.status = value
    },
    setDriverID(state, value) {
      state.entry.driverID = value
    },
    setPassenger(state, value) {
      state.entry.passengerID = value
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
