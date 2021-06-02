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
                <strong>Drivers</strong>
              </h4>
            </div>
            <div class="card-body">
              <back-button></back-button>
            </div>
            <div class="card-body">
              <bootstrap-alert />
              <div class="row">
                <div class="col-md-12">
                  <input class="form-control" type="hidden" :value="entry.id">
                    <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.name,
                      'is-focused': activeField == 'name'
                    }"
                  >
                    <label class="bmd-label-floating required">Name</label>
                    <input
                       class="form-control"
                      type="text"
                      :value="entry.name"
                      @input="updateName"
                      @focus="focusField('name')"
                      @blur="clearFocus"
                    />
                  </div>
                  <div class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.address,
                      'is-focused': activeField == 'address'
                    }">
                    <label class="bmd-label-floating" required>Address</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.address"
                      @input="updateAddress"
                      @focus="focusField('address')"
                      @blur="clearFocus"
                    />
                  </div>
                  <div class="form-group bmd-form-group has-items"
                    :class="{
                      'has-items': entry.gender,
                      'is-focused': activeField == 'gender'
                    }"
                  >
                  <label class="bmd-label-floating">
                    Gender
                  </label>
                  <v-select
                    :v-on="entry.gender"
                    @input="updateGender"
                    :options="lists.genders"
                    :clearable="false"
                  />
                  </div>
                   <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.mobile_no,
                      'is-focused': activeField == 'mobile_no'
                    }"
                  >
                    <label class="bmd-label-floating required">Mobile Number</label>
                    <input
                      class="form-control"
                      type="number"
                      step="0.01"
                      :value="entry.mobile_no"
                      @input="updateMobileNo"
                      @focus="focusField('mobile_no')"
                      @blur="clearFocus"
                      required
                    />
                  </div>
                    <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.civil_status,
                      'is-focused': activeField == 'civil_status'
                    }"
                  >
                    <label class="bmd-label-floating required">Civil Status</label>
                    <input
                       class="form-control"
                      type="text"
                      :value="entry.civil_status"
                      @input="updateCivilStatus"
                      @focus="focusField('civil_status')"
                      @blur="clearFocus"
                    />
                  </div>
                    <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': true,
                      'is-focused': activeField == 'birthday'
                    }"
                  >
                    <label class="bmd-label-floating required">Birthday</label>
                    <date-picker
                      class="form-control"
                      v-model="entry.birthday"
                      @input="updateBirthday"
                      placeholder="Birthday"
                      valueType="format"
                      @focus="focusField('birthday')"
                      @blur="clearFocus"
                    >
                    </date-picker>
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { DatePicker },
  data() {
    return {
      time1: '2019-10-09',
      status: '',
      activeField: '',
    }
  },
  computed: {
    ...mapGetters('DriverUsersSingle', ['entry', 'loading','lists'])
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
    ...mapActions('DriverUsersSingle', [
      'storeData', 
      'resetState',
      'setName',
      'setBirthday',
      'setAddress',
      'setGender',
      'setMobileNo',
      'setCivilStatus',
      'setUserAccountID',
      'fetchEditData'
      ]),
    updateName(e) {
      this.setName(e.target.value)
    },
    updateBirthday(e) {
      this.setBirthday(e)
    },
    updateAddress(e) {
      this.setAddress(e.target.value)
    },
    updateGender(value) {
      this.setGender(value)
    },
    updateMobileNo(e) {
      this.setMobileNo(e.target.value)
    },
    updateCivilStatus(e) {
      this.setCivilStatus(e.target.value)
    },
    submitForm() {
      this.updateData()
        .then(() => {
          this.$router.push({ name: 'driver_users.index' })
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
