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
                <strong>Routes</strong>
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
                      'has-items': entry.origin,
                      'is-focused': activeField == 'origin'
                    }"
                  >
                    <label class="bmd-label-floating required">Origin</label>
                    <v-select 
                      name="origin"
                      label="address"
                      :value="entry.origin"
                      :options="lists.origin"
                      @input="updateOrigin"
                      @focus="focusField('origin')"
                      @blur="clearFocus"
                      required
                      />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.destination,
                      'is-focused': activeField == 'destination'
                    }"
                  >
                    <label class="bmd-label-floating required">Destination</label>
                    <v-select 
                      name="destination"
                      label="address"
                      :value="entry.destination"
                      :options="lists.destination"
                      @input="updateDestination"
                      @focus="focusField('destination')"
                      @blur="clearFocus"
                      required
                      />
                  </div>

                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.pitstops,
                      'is-focused': activeField == 'pitstops'
                    }"
                  >
                    <label class="bmd-label-floating required">Pitstops</label>
                    <v-select
                      name="pitstops"
                      label="address"
                      :key="'pitstops-field'"
                      :v-model="entry.pitstops"
                      :options="lists.pitstops"
                      :closeOnSelect="false"
                      multiple
                      @input="updatePitstops"
                      @focus="focusField('pitstops')"
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
      activeField: ''
    }
  },
  computed: {
    ...mapGetters('RoutesSingle', ['entry', 'loading', 'lists'])
  },
  mounted() {
    this.fetchCreateData()
  },
  beforeDestroy() {
    this.resetState()
  },
  methods: {
    ...mapActions('RoutesSingle', [
      'storeData',
      'resetState',
      'setOrigin',
      'setDestination',
      'setPitstops',
      'fetchCreateData'
    ]),
    updateOrigin(value) {
      this.setOrigin(value)
    },
    updateDestination(value) {
      this.setDestination(value)
    },
    updatePitstops(value) {
      this.setPitstops(value)
    },
    submitForm() {
      this.storeData()
        .then(() => {
          this.$router.push({ name: 'routes.index' })
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
