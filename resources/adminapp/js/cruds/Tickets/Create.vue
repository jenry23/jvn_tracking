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
                <strong>Ticket</strong>
              </h4>
            </div>
            <div class="card-body">
              <back-button></back-button>
            </div>
            <div class="card-body">
              <bootstrap-alert />
              <div class="row">
                <div class="col-md-12">
                    <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.vehicleID,
                      'is-focused': activeField == 'vehicleID'
                    }"
                  >
                    <label class="bmd-label-floating required">Vehicle ID</label>
                    <v-select
                      name="vehicleID"
                      label="id"
                      :value="entry.vehicleID"
                      :options="lists.vehicleID"
                      @input="updateVehicleID"
                      @focus="focusField('vehicleID')"
                      @blur="clearFocus"
                      required
                      />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.routeID,
                      'is-focused': activeField == 'routeID'
                    }"
                  >
                    <label class="bmd-label-floating required">Route ID</label>
                    <v-select
                      name="routeID"
                      label="id"
                      :value="entry.routeID"
                      :options="lists.routeID"
                      @input="updateRouteID"
                      @focus="focusField('routeID')"
                      @blur="clearFocus"
                      required
                      />
                    </div>
                  <div class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.startTime,
                      'is-focused': activeField == 'startTime'
                    }">
                    <label class="bmd-label-floating" required>Start Time</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.startTime"
                      @input="updateStartTime"
                      @focus="focusField('startTime')"
                      @blur="clearFocus"
                    />
                  </div>
                   <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.endTime,
                      'is-focused': activeField == 'endTime'
                    }"
                  >
                    <label class="bmd-label-floating required">End Time</label>
                        <input
                      class="form-control"
                      type="text"
                      :value="entry.endTime"
                      @input="updateEndTime"
                      @focus="focusField('endTime')"
                      @blur="clearFocus"
                    />
                  </div>
                    <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.driverID,
                      'is-focused': activeField == 'driverID'
                    }"
                  >
                    <label class="bmd-label-floating required">Driver ID</label>
                    <v-select
                      name="driverID"
                      label="name"
                      :value="entry.driverID"
                      :options="lists.driverID"
                      @input="updateDriverID"
                      @focus="focusField('driverID')"
                      @blur="clearFocus"
                      required
                      />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.typeID,
                      'is-focused': activeField == 'typeID'
                    }"
                  >
                    <label class="bmd-label-floating required">Type ID</label>
                    <v-select
                      name="typeID"
                      label="name"
                      :value="entry.typeID"
                      :options="lists.typeID"
                      @input="updateTypeID"
                      @focus="focusField('typeID')"
                      @blur="clearFocus"
                      required
                      />
                  </div>
                    <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.passengerID,
                      'is-focused': activeField == 'passengerID'
                    }"
                  >
                    <label class="bmd-label-floating required">Passenger</label>
                    <v-select
                      name="passengerID"
                      label="name"
                      :key="'passengerID-field'"
                      :v-model="entry.passengerID"
                      :options="lists.passengerID"
                      :closeOnSelect="false"
                      multiple
                      @input="updatePassengerID"
                      @focus="focusField('passengerID')"
                      @blur="clearFocus"
                    />
                  </div>
                </div>
              </div>
            </div>
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
  data() {
    return {
      status: '',
      activeField: '',
    }
  },
  computed: {
    ...mapGetters('TicketsSingle', ['entry', 'loading','lists'])
  },
  beforeDestroy() {
    this.resetState()
  },
  mounted(){
      this.fetchCreatedData();
  },
  methods: {
    ...mapActions('TicketsSingle', [
      'fetchCreatedData',
      'storeData',
      'resetState',
      'setVehicleID',
      'setRouteID',
      'setStatus',
      'setPassenger',
      'setTypeID',
      'setStartTime',
      'setEndTime',
      'setDriverID'
      ]),
    updateVehicleID(e) {
      this.setVehicleID(e)
    },
    updateRouteID(e) {
      this.setRouteID(e)
    },
    updateStatus(e) {
      this.setStatus(e.target.value)
    },
    updateStartTime(e) {
      this.setStartTime(e.target.value)
    },
    updateEndTime(e) {
      this.setEndTime(e.target.value)
    },
    updateDriverID(e){
      this.setDriverID(e)
    },
    updateTypeID(e){
      this.setTypeID(e)
    },
    updatePassengerID(e){
      this.setPassenger(e)
    },
    submitForm() {
      this.storeData()
        .then(() => {
          this.$router.push({ name: 'tickets.index' })
        })
        .catch(error => {
          this.status = 'failed'
          _.delay(() => {
            this.status = ''
          }, 3000)
        })
    },
    focusField(name) {
      this.activeField = name
    },
    clearFocus() {
      this.activeField = ''
    }
  }
}
</script>
