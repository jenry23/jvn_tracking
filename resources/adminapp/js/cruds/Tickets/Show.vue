<template>
<div class="row">
  <div class="col-md-8">
    <GmapMap
      :center='center'
      ref="mapRef"
      :zoom='15'
      style='width:100%;  height: 800px;'
    >
  <DirectionsRenderer :origin="this.center" :destination="this.marker" travelMode="DRIVING"/>
 </GmapMap>
  </div>
<div class="col-md-4">
  <div class="card">
  <div class="card-header" style="background-color: rgb(34, 139, 34);">
        <i class="fa fa-university"></i><strong style="color: white;"> Navigation Maps</strong>
  </div>
   <div class="card-body">
        <div id="panel"></div>
    </div>
    </div>
       <div class="latLngLabel">{{lat}}, {{lng}}</div>
      <button class="btn btn-info" @click="startLocationUpdates">
        <i class="circle dot outline icon large"></i>
        Start Location
      </button>

      <button class="btn btn-danger" @click="stopLocationUpdates">
        <i class="circle dot outline icon large"></i>
        Stop Location
      </button>
    </div>
</div>
</template>

<script>
import * as fb from '../../firebase'
import DirectionsRenderer from '@components/Maps/DirectionsRenderer';
import {gmapApi} from 'vue2-google-maps'

export default {
  components:{
    DirectionsRenderer
  },
data() {
    return {
      user: null,
      center: { lat: 0, lng: 0 },
      marker: { lat: 14.1935599, lng: 121.2848253 },
      routingService:{},
      lat:0,
      lng:0,
      position:'',
      watchPositionId:null
    };
  },
  computed: {
    google: gmapApi
  },
  mounted() {
    fb.auth.onAuthStateChanged(user => {
      this.user = user;
    });
  },
 methods: {
 signOutButtonPressed() {
    fb.auth.signOut()
    .then(user => {
        this.$router.push({
        name: "/"
        });
    })
    .catch(error => {
        console.log(error.message);
    });
 },
 startLocationUpdates() {
   this.watchPositionId = navigator.geolocation.watchPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.updateLocation(this.lat, this.lng);
          this.updateCenter(this.lat, this.lng);
          console.log(this.lat);
        },
        error => {
          console.log(error.message);
        }
    );
      
    },
    stopLocationUpdates(){
          navigator.geolocation.clearWatch(this.watchPositionId);
    },
    updateCenter(lat,lng){
       this.center = {
          lat: lat,
          lng: lng
      }
    },
    updateLocation(lat, lng) {
     const updateData = {
          latitude : lat,
          longitude : lng   
     };
      fb.db_firebase.ref('driverTrips/'+ this.$route.params.id).update(updateData);
      this.updateMarkers();
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