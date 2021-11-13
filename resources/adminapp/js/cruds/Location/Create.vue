<template>
   <div class="container-fluid">
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-primary card-header-icon">
                <div class="card-icon">
                    <i class="material-icons">add</i>
                </div>
                <h4 class="card-title">
                    Create
                    <strong>Location</strong>
                </h4>
                </div>
                <div class="card-body">
                <div class="form-group bmd-form-group" :class="{
                        'has-items': entry.name,
                        'is-focused': activeField == 'name'}">
                    <label class="bmd-label-floating required">Name</label>
                    <input
                        class="form-control"
                        type="text"
                        :value="entry.name"
                        v-uppercase
                        @input="updateName"
                        @focus="focusField('name')"
                        @blur="clearFocus"
                    />
                    </div>

                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.tag,
                      'is-focused': activeField == 'tag'
                    }"
                  >
                    <label class="bmd-label-floating required">Tag</label>
                    <v-select 
                      name="tag"
                      label="name"
                      :value="entry.tag"
                      :options="lists.tag"
                      @input="updateTag"
                      @focus="focusField('tag')"
                      @blur="clearFocus"
                      required
                      />
                  </div>
                <GmapAutocomplete
                    @place_changed='setPlace'
                    class="form-control"
                    :options="{fields: ['name','geometry']}"
                />
                <input type="button" class="btn btn-info"
                    @click='addMarker' value="Add" required>
                </div>
                <br>
                <GmapMap
                :center='center'
                :zoom='15'
                style='margin-left:30px; width:90%;  height: 400px;'
                >
                <GmapMarker
                    :position="markers"
                    @click="center=position"
                    :draggable="true"
                    @dragend="updateCoordinates"
                    :style="{'position': 'absolute'}"
                />
                </GmapMap>
                
                <div class="card-footer">
              <vue-button-spinner
                class="btn-primary"
                :status="status"
                :isLoading="loading"
                :disabled="loading"
              >
              Save
              </vue-button-spinner>
            </div>
            </div>
          </div>
          </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GoogleMap',
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: { lat: 0, lng: 0},
      places: [],
      status: '',
      activeField: ''
    }
  },
  mounted() {
    this.geolocate();
    this.fetchCreateData();
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('LocationSingle', ['entry', 'loading','lists'])
  },
  methods: {
    ...mapActions('LocationSingle', [
      'storeData',
      'resetState',
      'setName',
      'setAddress',
      'setTag',
      'setLongitude',
      'setLatitude',
      'fetchCreateData'
    ]),
    updateAddress(e){
      this.setAddress(e.target.value)
    },
    updateName(e){
        this.setName(e.target.value)
    },
    updateTag(value){
        this.setTag(value)
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    focusField(name) {
      this.activeField = name
    },
    clearFocus() {
      this.activeField = ''
    },
    submitForm() {
      this.storeData()
        .then(() => {
          this.$router.push({ name: 'location.index' })
        })
        .catch(error => {
          this.status = 'failed'
          _.delay(() => {
            this.status = ''
          }, 3000)
        })
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.setLatitude(this.currentPlace.geometry.location.lat());
        this.setLongitude(this.currentPlace.geometry.location.lng());
        this.setAddress(this.currentPlace.name);
        this.markers = marker;
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    updateCoordinates(location){
        this.center = {
                lat: location.latLng.lat(),
                lng: location.latLng.lng(),
       };
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
};
</script>