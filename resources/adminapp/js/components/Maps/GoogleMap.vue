<style>
.modal {
    min-width: 300px;
}
@media (min-width: 992px) {
    .modal-xl {
        max-width: 800px;
    }
}
@media (min-width: 1200px) {
    .modal-xl {
        max-width: 1140px;
    }
}
.modal-footer {
    padding: 15px 0px 0px 0px;
    border-top: 1px solid #e5e5e5;
    margin-left: -14px;
    margin-right: -14px;
}
.anyClass {
    height: 300px;
    overflow-y: scroll;
}
</style>
<template>
    <div>
        <button
            type="button"
            class="btn btn-default maps-refresh"
            @click="fetchMap"
        >
            <i class="material-icons"> refresh </i>
            Refresh
        </button>
        <Modal v-model="showModal" :title="title" modal-class="modal-xl">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div
                            class="card-header"
                            style="background-color: rgb(34, 139, 34)"
                        >
                            <i class="fa fa-university"></i
                            ><strong style="color: white">
                                Navigation Maps</strong
                            >
                        </div>
                        <div class="card-body">
                            <div id="panel" class="anyClass"></div>
                        </div>
                    </div>

                    <div class="card">
                        <div
                            class="card-header"
                            style="background-color: rgb(34, 139, 34)"
                        >
                            <i class="fa fa-university"></i
                            ><strong style="color: white">
                                Passenger List</strong
                            >
                        </div>
                        <div class="anyClass">
                            <div
                                class="card-body"
                                v-for="datas in passenger"
                                :key="datas.id"
                            >
                                <div v-if="datas.pickup == true">
                                    <b>{{ datas.name }}</b> -
                                    <i
                                        class="material-icons"
                                        style="color: green"
                                        >check</i
                                    >
                                </div>
                                <div v-else>
                                    <b>{{ datas.name }}</b> -
                                    <i class="material-icons" style="color: red"
                                        >block</i
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-8">
                    <gmap-map
                        :center="one_center"
                        :zoom="18"
                        style="width: 100%; height: 800px"
                    >
                        <DirectionsRenderer
                            :origin="this.one_center"
                            :destination="this.destination"
                            :waypoints="this.waypts"
                            travelMode="DRIVING"
                        />
                    </gmap-map>
                </div>
            </div>
        </Modal>
        <gmap-map
            :center="this.center"
            :zoom="15"
            :options="{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            }"
            ref="mapRef"
            style="width: 100%; height: 800px"
        >
            <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :options="{
                    preserveViewport: true,
                }"
                :position="m.position"
                @click="toggleInfoWindow(m, index)"
            />

            <div v-for="(m, index) in markers" :key="index">
                <gmap-info-window :options="infoOptions" :position="m.position">
                    <div v-html="(infoContent = m.name)"></div>
                </gmap-info-window>
            </div>
        </gmap-map>
    </div>
</template>


<script>
import * as fb from '../../firebase'
import DirectionsRenderer from "./DirectionsRenderer";
import {gmapApi} from 'vue2-google-maps'
import '@kouts/vue-modal/dist/vue-modal.css'

export default {
  name: 'GoogleMap',
  components:{
    DirectionsRenderer,
  },
  data() {
    return {
      center: { lat: 14.184794666666667, lng: 121.283092 },
      one_center: { lat: 0, lng: 0 },
      waypts : [],
      destination: { lat: 0, lng: 0},
      passenger: [],
      currentPlace: null,
      showModal: false,
      panel :'',
      title: '',
      markers: [],
      drivers: [],
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: true,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
    }
  },
  computed: {
    google: gmapApi
  },
  mounted() {
    this.renderMap();
  },
  methods: {
    fetchMap(){
      this.renderMap();
    },
    renderMap(){
     const markerData = [];
      var self = this;
      var query = fb.db_firebase.ref('driverTrips/');
      query.on('value', function (snapshot) {
      const marker = [];
        snapshot.forEach(function (data) {
              var key = data.key;
              var obj = data.val();
              if(obj.latitude != 0){
              // self.infoWindowPos = position;
              // console.log(key)
              // self.infoContent = self.getInfoWindowContent(key);
              marker.push({
                name: key,
                position:{
                  lat:obj.latitude,
                  lng:obj.longitude
                }
              })
              }
          })
          self.markers = marker
      })
        // if(this.$refs.mapRef){
        //     this.$refs.mapRef.$mapPromise.then((map) => {

        //     const trafficLayer = new google.maps.TrafficLayer();
        //     trafficLayer.setMap(map)
        //     const bounds = new google.maps.LatLngBounds()
        //         for (let m of this.markers) {
        //           bounds.extend(m.position)
        //         }
        //         map.fitBounds(bounds);
        //     });
        //   }
    },
    toggleInfoWindow: function (marker, idx) {
      this.showModal = true;
      if(this.showModal ==true){
        this.getOneData(marker.name);
      }
    },
    getInfoWindowContent: function (marker) {
        return (`
            <p class="title is-4">${marker}</p>
      `);
    },
    getOneData(name){
      fb.ticketsCollection.where('status','==','On Going').where('vehicleID','==',name)
      .onSnapshot((response)=>{
        response.forEach((doc) => {
            var vehicle = doc.data().vehicleID;
            var route = doc.data().routeID;
            this.updateData(vehicle,route)
        });
      }, (error) => {
        console.log(error);
      })
    },
    updateData(vehicle,route)
    {
        this.title = vehicle+' - '+route;
        const self = this;
        var query = fb.db_firebase.ref('driverTrips/');
        query.on('value', function (snapshot) {
        var value = snapshot.val()[vehicle];
              var latitude = parseFloat(value.latitude);
              var longitude = parseFloat(value.longitude);
              self.one_center = {
                lat: latitude,
                lng: longitude,
              };
        });
        fb.ticketsCollection.doc(route).onSnapshot(response => {
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
  },
};
</script>
