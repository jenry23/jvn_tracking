<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <GmapAutocomplete
        @place_changed='setPlace'
      />
      <button
        @click='addMarker'
      >
        Add
      </button>
    </div>
    {{ center }}
    <GmapMap
      :center='center'
      :zoom='15'  
      ref="mapRef"
      style='width:100%;  height: 800px;'
    >
    <GmapMarker ref="myMarker"
     :position="google && new google.maps.LatLng(this.center)" />
     />
    </GmapMap>
  </div>
</template>


<script>
import * as fb from '../../firebase'
import DirectionsRenderer from "./DirectionsRenderer";
import {gmapApi} from 'vue2-google-maps'

export default {
  name: 'GoogleMap',
  components:{
    DirectionsRenderer
  },
  data() {
    return {
      center: { lat: 0, lng: 0 },
      marker: { lat: 14.1935599, lng: 121.2848253 },
      currentPlace: null,
      panel :'',
      markers: [],
      places: [],
      bounds: {}
    }
  },
  computed: {
    google: gmapApi,
    origin() {
      if (!this.start) return null;
      return { query: this.start };
    },
    destionation() {
      if (!this.end) return null;
      return { query: this.end };
    }
  },
  mounted() {
    this.updateMarkers();
    this.geolocate();
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: 14.254004666666667,
          lng: 121.37980116666667,
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
    const self = this;
    var query = fb.db_firebase.ref('driverTrips/');
    query.on('value', function (snapshot) {
      var value = snapshot.val().E7Dz1of399gEDpvK7UOT;
          var latitude = parseFloat(value.latitude);
          var longitude = parseFloat(value.longitude);
          self.center = {
            lat: latitude,
            lng: longitude,
          };
        });
    self.start = { 
      lat: 14.1819506,
      lng: 121.1772846,
    }
    console.log(self.start);
    },
     updateMarkers: function() {
      // Remove previous markers
      
         this.$refs.mapRef.$mapPromise.then((map) => {
            const trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map)

            map.panTo(this.center);
          })
      },
      addChangeBoundsListener() {
      
      },
  },
};
</script>   