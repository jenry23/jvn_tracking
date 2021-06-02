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
                Update
                <strong>Vehicles</strong>
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
                      'has-items': entry.owner,
                      'is-focused': activeField == 'owner'
                    }"
                  >
                    <label class="bmd-label-floating required">Owner</label>
                    <input
                       class="form-control"
                      type="text"
                      :value="entry.owner"
                      @input="updateOwner"
                      @focus="focusField('owner')"
                      @blur="clearFocus"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.brand_name,
                      'is-focused': activeField == 'brand_name'
                    }"
                  >
                    <label class="bmd-label-floating required">Brand Name</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.brand_name"
                      @input="updateBrandName"
                      @focus="focusField('brand_name')"
                      @blur="clearFocus"
                      required
                   />
                    </div>
                  <div class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.or_no,
                      'is-focused': activeField == 'or_no'
                    }">
                    <label class="bmd-label-floating" required>OR Number</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.or_no"
                      @input="updateOrNo"
                      @focus="focusField('or_no')"
                      @blur="clearFocus"
                    />
                  </div>
                   <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.cr_no,
                      'is-focused': activeField == 'cr_no'
                    }"
                  >
                    <label class="bmd-label-floating required">CR Number</label>
                        <input
                      class="form-control"
                      type="text"
                      :value="entry.cr_no"
                      @input="updateCrNo"
                      @focus="focusField('cr_no')"
                      @blur="clearFocus"
                    />
                  </div>
                    <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.plate_no,
                      'is-focused': activeField == 'plate_no'
                    }"
                  >
                    <label class="bmd-label-floating required">Plate Number</label>
                    <input
                       class="form-control"
                      type="text"
                      :value="entry.plate_no"
                      @input="updatePlateNo"
                      @focus="focusField('plate_no')"
                      @blur="clearFocus"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.max_passenger,
                      'is-focused': activeField == 'max_passenger'
                    }"
                  >
                    <label class="bmd-label-floating required">Max Passenger</label>
                    <input
                      class="form-control"
                      type="number"
                      :value="entry.max_passenger"
                      @input="updateMaxPassenger"
                      @focus="focusField('max_passenger')"
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
                {{ $t('global.save') }}
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
    ...mapGetters('VehicleSingle', ['entry', 'loading'])
  },
  beforeDestroy() {
    this.resetState()
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.resetState()
        this.fetchEditData(this.$route.params.id)
      }
    }
  },
  methods: {
    ...mapActions('VehicleSingle', [
      'updateData', 
      'resetState',
      'setOwner',
      'setBrandName',
      'setOrNo',
      'setCrNo',
      'setPlateNo',
      'setMaxPassenger',
      'fetchEditData'
      ]),
    updateOwner(e) {
      this.setOwner(e.target.value)
    },
    updateBrandName(e) {
      this.setBrandName(e.target.value)
    },
    updateOrNo(e) {
      this.setOrNo(e.target.value)
    },
    updateCrNo(e) {
      this.setCrNo(e.target.value)
    },
    updatePlateNo(e) {
      this.setPlateNo(e.target.value)
    },
    updateMaxPassenger(e){
      this.setMaxPassenger(e.target.value)
    },
    submitForm() {
      this.updateData()
        .then(() => {
          this.$router.push({ name: 'vehicle.index' })
          this.$eventHub.$emit('create-success')
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
