<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-header-primary card-header-icon">
            <div class="card-icon">
              <i class="material-icons">remove_red_eye</i>
            </div>
            <h4 class="card-title">
              View
              <strong>Driver</strong>
            </h4>
          </div>
          <div class="card-body">
            <back-button></back-button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <div class="table">
                    <tbody>
                      <tr>
                        <td class="text-primary">
                          Name
                        </td>
                        <td>
                          {{ entry.name }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          Address
                        </td>
                        <td>
                          {{ entry.address }}
                        </td>
                        </tr>
                        <tr>
                        <td class="text-primary">
                          Birthday
                        </td>
                        <td>
                          {{ entry.birthday }}
                        </td>
                         </tr>
                         <tr>
                          <td class="text-primary">
                          Gender
                        </td>
                        <td>
                          {{ entry.gender }}
                        </td>
                        </tr>
                         <tr>
                          <td class="text-primary">
                          Mobile Number
                        </td>
                        <td>
                          {{ entry.mobile_no }}
                        </td>
                        </tr>
                    </tbody>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('DriverUsersSingle', ['entry'])
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.resetState()
        this.fetchShowData(this.$route.params.id)
      }
    }
  },
  methods: {
    ...mapActions('DriverUsersSingle', ['fetchShowData', 'resetState'])
  }
}
</script>
