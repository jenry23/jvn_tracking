<style scoped>
.anyClass {
  height:300px;
  overflow-y: scroll;
}
</style>
<template>
<div>
    <h4 class="card-title">
      History
      <strong>Ticket</strong>
    </h4> 
    <back-button></back-button>
      <download-excel
      class="btn btn-primary float-right"
      :data="data"
      :fields="json_fields"
      worksheet="Trip Ticket"
      name="trip_ticket.xls"
    >
      Export Trip Ticket
    </download-excel>
    <button @click="daily" class="btn btn-warning">Daily</button>
    <button @click="weekly" class="btn btn-warning">Weekly</button>
    <button @click="monthly" class="btn btn-warning">Monthly</button>
    <button @click="annual" class="btn btn-warning">Annual</button>
    <h3>{{ title }}</h3>
  <div class="row">
    
  <div class="col-12" v-for="datas in data" :key="datas.id">
    <div class="card text-dark">
      <div class="card-header" style="background-color: #006400;">
   
    <i class="fa fa-university"> </i> <strong style="color:white;"> Ticket Number : {{ datas.id }}</strong>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <table class="table table-responsive table-sm">
              <tbody>
                <tr>
                  <th class="border-0 w-50">Route ID :</th>
                  <td class="border-0">{{ datas.routeID }}</td>
                </tr>
                <tr>
                  <th>Vehicle ID :</th>
                  <td>{{ datas.vehicleID }}</td>
                </tr>
                <tr>
                  <th>Schedule :</th>
                  <td>{{ datas.startTime }} - {{ datas.endTime }}</td>
                </tr>
                <tr>
                  <th>Status :</th>
                  <td>{{ datas.status }}</td>
                </tr>
                <tr>
                    <a href="#"
                    class="btn btn-primary"
                    type="button"
                    @click.prevent="approveData(datas.id,datas.vehicleID)"
                    v-if="datas.status === 'Completed'"
                  >
                  Approve By Admin
                  </a>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-3">
              <table class="table table-responsive table-sm anyClass">
                <thead>
                  <tr>
                  <th><b>Passenger Name</b></th>
                  </tr>
                </thead>
              <tbody v-for="result in datas.passenger">
                  <tr >
                  <td>{{ result.name }}</td>
                  </tr>
              </tbody>
              </table>
          </div>
          <div class="5">
            <GmapMap
              :center='center'
              ref="mapRef"
              :zoom='18'
              style='width:100%;  height: 800px;'
            >
              <DirectionsRenderer :origin="this.center" :destination="this.destination" :waypoints="this.waypts" travelMode="DRIVING"/>
            </GmapMap>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DirectionsRenderer from '@components/Maps/DirectionsRenderer';
import {gmapApi} from 'vue2-google-maps'

export default {
  components:{
    DirectionsRenderer
  },
  data() {
    return {
      title:'Daily',
      json_data: [],
      bank_accounts: [],
      xprops: {
        module: 'TicketsIndex',
        route: 'tickets',
        permission_prefix: 'tickets_'
      },
       json_fields: {
         Date:'date',
         Route:'routeID',
         Vehicle:'vehicleID',
         Driver:'driverID',
         "Start Time":'startTime',
         "End Time": 'endTime',
         "Passenger" : 'passengerID'
       }
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('TicketsIndex', ['data', 'total', 'loading']),
    google: gmapApi
  },
  mounted() {
    this.fetchDailyData();
    this.updateData();
    this.updateMarkers();
  },
  methods: {
    ...mapActions('TicketsIndex', [
      'fetchDailyData',
      'fetchWeeklyData',
      'fetchMonthlyData',
      'fetchAnnualData',
      'setQuery',
      'resetState'
    ]),
    daily(){
      this.fetchDailyData();
      this.title = 'Daily'
    },
    weekly(){
      this.fetchWeeklyData();
      this.title = 'Weekly'
    },
    monthly(){
      this.fetchMonthlyData();
      this.title = 'Monthly'
    },
    annual(){
      this.fetchAnnualData();
      this.title = 'Annual'
    },
    approveData(id,vehicleID) {
      this.$swal({
        title: 'Are you sure?',
        text: "You want to Approve!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#dd4b39',
        focusCancel: true,
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch(this.xprops.module + '/approveAdmin', id)
            .then(result => {
                this.$swal({  
                   type: 'primary',  
                   title: 'Succesfully',  
                   text: 'Approved By Admin'
               });  
            })
        }
      })
    },
    updateData(){
        var id = this.$route.params.id
        const self = this;
        var query = fb.db_firebase.ref('driverTrips/');
        var vehicle = this.$route.params.vehicle
        query.on('value', function (snapshot) {
        var value = snapshot.val()[vehicle];
              var latitude = parseFloat(value.latitude);
              var longitude = parseFloat(value.longitude);
              self.center = {
                lat: latitude,
                lng: longitude,
              };
        }); 
        fb.ticketsCollection.doc(id).onSnapshot(response => {
        var passengerList = response.data().passengerID; 
        var routeID = response.data().routeID;
        fb.routesCollection.doc(routeID).onSnapshot((response) => {
          var routeList = response.data();
          var destinationID = routeList['destination'];
          var waypointsID = routeList['pitstops'];
          var waypointsLocation = [];
          fb.locationsCollection.doc(destinationID).onSnapshot(response => {
            var destination = {
              lat : response.data().latitude,
              lng : response.data().longitude
            }
            this.destination = destination;
          });
          waypointsID.forEach((doc)=>{
            fb.locationsCollection.doc(doc).onSnapshot(response => {
              waypointsLocation.push({
                location:{
                    lat : response.data().latitude,
                    lng : response.data().longitude
                },
                stopover: true,
              });
            });
          });
          this.waypts = waypointsLocation
        });
        this.passenger =   passengerList;

      });
   },
  updateMarkers: function() {
         this.$refs.mapRef.$mapPromise.then((map) => {
            const trafficLayer = new google.maps.TrafficLayer();
             trafficLayer.setMap(map)
           })
    } 
  }
}
</script>
