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
                      name="gender"
                      label="name"
                      :value="entry.gender"
                      :options="lists.gender"
                      @input="updateGender"
                      @focus="focusField('gender')"
                      @blur="clearFocus"
                      required
                  />
                  </div>
                   <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.mobile_no,
                      'is-focused': activeField == 'mobile_no'
                    }"
                  >
                    <label class="bmd-label-floating required">
                      Mobile Number
                    </label>
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
                      'has-items': true,
                      'is-focused': activeField == 'birthday'
                    }"
                  >
                    <label class="bmd-label-floating required">Birthday</label>
                    <date-picker
                      class="form-control"
                      :value="entry.birthday"
                      valueType="format"
                      @input="updateBirthday"
                      placeholder="Birthday"
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { DatePicker },
  data() {
    return {
      time1: '',
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
  mounted() {
    this.fetchCreateData()
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
      'setUserAccountID',
      'fetchCreateData'
      ]),
    updateName(e) {
      this.setName(e.target.value)
    },
    updateBirthday(e) {
      console.log(e);
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
    submitForm() {
      this.storeData()
        .then(() => {
          this.$router.push({ name: 'driver_users.index' })
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
