<style scoped>
/* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
#map {
  height: 100%;
}

/* Optional: Makes the sample page fill the window. */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.ui-button {
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  padding: 0 0.5em;
  font: 400 18px Roboto, Arial, sans-serif;
  overflow: hidden;
  height: 40px;
  cursor: pointer;
}
.ui-button:hover {
  background: #ebebeb;
}
</style>
<template>
<div>
      <div id="map" style='width:100%;  height: 800px;'></div>
<div class="latLngLabel">{{lat}}, {{lng}}</div>
  <div class="card mt-4">
  <div class="card-header" style="background-color: rgb(34, 139, 34);">
        <i class="fa fa-university"></i><strong style="color: white;"> Navigation Maps</strong>
  </div>
   <div class="card-body">
        <div id="panel"></div>
    </div>
    </div>
      <button class="btn btn-info" @click="startLocationUpdates">
        <i class="circle dot outline icon large"></i>
        Start Location
      </button>

      <!-- <button class="btn btn-danger" @click="stopLocationUpdates">
        <i class="circle dot outline icon large"></i>
        Stop Location
      </button> -->
</div>
</template>

<script>
import * as fb from '../../../firebase'
import { Tween, update, Easing } from "@tweenjs/tween.js";

export default {
data() {
    return {
      user: null,
      center: { lat: 0, lng: 0 },
      marker: { lat: 14.111047, lng: 121.144772 },
      routingService:{},
      lat:0,
      lng:0,
      position:'',
      watchPositionId:null
    };
  },
  mounted(){
      this.initMap()
  },
  methods:{
   initMap() {
      // const cameraOptions = {
      //   zoom: 12,
      //   center: this.center,
      // };
      // console.log(this.center)

      // var directionsRenderer = new google.maps.DirectionsRenderer();
      // var directionsService = new google.maps.DirectionsService();

      // var map = new google.maps.Map(document.getElementById("map"),cameraOptions);
      // this.calculateAndDisplayRoute(directionsService, directionsRenderer);
      // directionsRenderer.setMap(map);
    },

    calculateAndDisplayRoute(directionsService, directionsRenderer){

      const waypts = [
        {
          location: {
            lat: 14.077069,
            lng:121.194123
          },
          stopover:true
        }
      ];
        var start = this.center;
        var end = this.marker;
         directionsRenderer.setOptions({
          preserveViewport : true,
         })

         directionsService.route(
          {
            origin: start,
            destination: end,
            waypoints: waypts,
            drivingOptions: {
            departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
             trafficModel: 'optimistic'
            },
            travelMode: 'DRIVING'
          },
        (response, status) => {
        if (status == "OK") {
          directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
        }
      )
    },
    startLocationUpdates() {
      this.watchPositionId = navigator.geolocation.watchPosition(
            position => {
              this.lat = position.coords.latitude;
              this.lng = position.coords.longitude;
              this.updateLocation(this.lat, this.lng);
              this.updateCenter(this.lat, this.lng);
            },
            error => {
              console.log(error.message);
            }
        ); 

        console.log(this.center)
         const cameraOptions = {
            tilt: 0,
            heading: 0,
            zoom: 12,
            center: this.center,
        };
          const mapOptions = {
          ...cameraOptions,
            mapId: "15431d2b469f209e",
            preserveViewport : true,
          };
          var map = new google.maps.Map(document.getElementById("map"), mapOptions);
          new Tween(cameraOptions) // Create a new tween that modifies 'cameraOptions'.
            .to({ tilt: 65, heading: 90, zoom: 20 }, 10000) // Move to destination in 15 second.
            .easing(Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(() => {
              map.moveCamera(cameraOptions);
            })
            .start(); // Start the tween immediately.

          function animate(time) {
            requestAnimationFrame(animate);
            update(time);
          }
          requestAnimationFrame(animate);
          var icons = {
            start: new google.maps.MarkerImage(
            // URL
            'http://maps.google.com/mapfiles/kml/pal4/icon15.png',
            // (width,height)
            new google.maps.Size( 44, 32 ),
            // The origin point (x,y)
            new google.maps.Point( 0, 0 ),
            // The anchor point (x,y)
            new google.maps.Point( 22, 32 )
            ),
          };
            var marker = new google.maps.Marker({
              position: this.center,
              map: map,
            });
          // var directionsRenderer = new google.maps.DirectionsRenderer();
          // var directionsService = new google.maps.DirectionsService();
          // this.calculateAndDisplayRoute(directionsService, directionsRenderer);
          // directionsRenderer.setMap(map);

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
        },
  },
   
}
</script>