import * as fb from '../../../firebase'

const set = key => (state, val) => {
    state[key] = val
  }

  function initialState() {
    return {
      data: [],
      approve: 0,
      total: 0,
      query: {},
      loading: false
    }
  }

  const route = 'vehicle'

  const getters = {
    data: state => state.data,
    total: state => state.total,
    approve: state => state.approve,
    loading: state => state.loading
  }

  const actions = {
    AutomaticApprove({commit,state}){

      fb.ticketsCollection.where('status','==','Pending').onSnapshot((response) => {
        response.forEach((doc) => {
          var vehicle = doc.data().vehicleID;
          var ticket_id = doc.data().routeID
          if(vehicle)
          {
            fb.ticketsCollection.where('vehicleID','==',vehicle).where('status','==','On Going').get().then(snapshot => {
              if (snapshot.size > 0) {
                console.log('test');
              }else{
                var status = {status:"On Going"};
                fb.ticketsCollection.doc(ticket_id).update(status).then(response => {

                })
               }
            });
          }
        })
      })
    },
    fetchIndexData({ commit, state }) {
      commit('setLoading', true)

      let vehiclesData = [];
      fb.ticketsCollection.where('status','!=','Completed').get().then((response) => {
        response.forEach((doc) => {
          vehiclesData.push({
             id: doc.id,
             driverID: doc.data().driverID,
             startTime: doc.data().startTime,
             endTime: doc.data().endTime,
             routeID: doc.data().routeID,
             status: doc.data().status,
             vehicleID: doc.data().vehicleID,
           });
      })
        const results = vehiclesData;
        const total = vehiclesData.length;
        commit('setData', results)
        commit('setTotal', total )
        },(error) => {
          message = error.response.data.message || error.message
          // TODO error handling
          console.log('error');
        })
    },

    fetchDailyData({ commit, state }) {
      commit('setLoading', true)

      let vehiclesData = [];
      fb.ticketsCollection.where('status','==','Completed').get().then((response) => {
        response.forEach((doc) => {
          const date = doc.data().date.toDate().toDateString()
          vehiclesData.push({
             id: doc.id,
             date: date,
             driverID: doc.data().driverID,
             startTime: doc.data().startTime,
             endTime: doc.data().endTime,
             routeID: doc.data().routeID,
             status: doc.data().status,
             vehicleID: doc.data().vehicleID,
             passengerID: doc.data().passengerID.length,
             passenger: doc.data().passengerID
           });
        })
        const results = vehiclesData;
        const total = vehiclesData.length;
        commit('setData', results)
        commit('setTotal', total )
        },(error) => {
          message = error.response.data.message || error.message
          // TODO error handling
          console.log('error');
        })
    },
    fetchWeeklyData({ commit, state }) {
      commit('setLoading', true)

      let vehiclesData = [];
      var today_date = new Date(Date.now());

      fb.ticketsCollection.where('status','==','Approved')
      .get().then((response) => {
        console.log(response);
        response.forEach((doc) => {
          const date = doc.data().date.toDate().toDateString()
          vehiclesData.push({
             id: doc.id,
             date: date,
             driverID: doc.data().driverID,
             startTime: doc.data().startTime,
             endTime: doc.data().endTime,
             routeID: doc.data().routeID,
             status: doc.data().status,
             vehicleID: doc.data().vehicleID,
             passengerID: doc.data().passengerID.length,
             passenger: doc.data().passengerID
           });
        })
        const results = vehiclesData;
        const total = vehiclesData.length;
        commit('setData', results)
        commit('setTotal', total )
        },(error) => {
          message = error.response.data.message || error.message
          // TODO error handling
          console.log('error');
        })
    },
    fetchMonthlyData({ commit, state }) {
      commit('setLoading', true)

      let vehiclesData = [];
      var today_date = new Date(Date.now());

      fb.ticketsCollection.where('status','==','Approved')
      .get().then((response) => {
        console.log(response);
        response.forEach((doc) => {
          const date = doc.data().date.toDate().toDateString()
          vehiclesData.push({
             id: doc.id,
             date: date,
             driverID: doc.data().driverID,
             startTime: doc.data().startTime,
             endTime: doc.data().endTime,
             routeID: doc.data().routeID,
             status: doc.data().status,
             vehicleID: doc.data().vehicleID,
             passengerID: doc.data().passengerID.length,
             passenger: doc.data().passengerID
           });
        })
        const results = vehiclesData;
        const total = vehiclesData.length;
        commit('setData', results)
        commit('setTotal', total )
        },(error) => {
          message = error.response.data.message || error.message
          // TODO error handling
          console.log('error');
        })
    },
    fetchAnnualData({ commit, state }) {
      commit('setLoading', true)

      let vehiclesData = [];
      var today_date = new Date(Date.now());

      fb.ticketsCollection.where('status','==','Approved')
      .get().then((response) => {
        console.log(response);
        response.forEach((doc) => {
          const date = doc.data().date.toDate().toDateString()
          vehiclesData.push({
             id: doc.id,
             date: date,
             driverID: doc.data().driverID,
             startTime: doc.data().startTime,
             endTime: doc.data().endTime,
             routeID: doc.data().routeID,
             status: doc.data().status,
             vehicleID: doc.data().vehicleID,
             passengerID: doc.data().passengerID.length,
             passenger: doc.data().passengerID
           });
        })
        const results = vehiclesData;
        const total = vehiclesData.length;
        commit('setData', results)
        commit('setTotal', total )
        },(error) => {
          message = error.response.data.message || error.message
          // TODO error handling
          console.log('error');
        })
    },
    approveAdmin({ commit, state, dispatch }, id) {
      var status = {status:"Approved"};
      fb.ticketsCollection.doc(id).update(status).then(response => {
        dispatch('fetchDailyData')
      });
    },
    approveData({ commit, state, dispatch }, id) {
      var value = id.split('|');
      var ticket_id = value[0];
      var vehicle_id = value[1];
      var status = {status:"On Going"};

      return new Promise((resolve, reject) => {
      fb.ticketsCollection.where('vehicleID','==',vehicle_id).where('status','==','On Going').get().then(snapshot => {
        if (snapshot.size > 0) {
          resolve('1')
       } else {
        fb.ticketsCollection.doc(ticket_id).update(status).then(response => {
          resolve('0')
            dispatch('fetchIndexData')
          })
        .catch(error => {
          message = error.response.data.message || error.message
          // TODO error handling
        })
        }
      })
    })

    },
    destroyData({ commit, state, dispatch }, id) {
         fb.ticketsCollection.doc(id).delete().then(response => {
            dispatch('fetchIndexData')
         })
        .catch(error => {
          message = error.response.data.message || error.message
          // TODO error handling
        })
    },
    fetchShow({ commit,state,dispatch }, id) {
      let passengerList = [];
      let routeList = []

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
    setApprove: set('approve'),
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
