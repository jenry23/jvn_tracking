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
              <strong>Vehicle</strong>
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
                          Owner Name
                        </td>
                        <td>
                          {{ entry.owner }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          Brand Name
                        </td>
                        <td>
                          {{ entry.brand_name }}
                        </td>
                        </tr>
                        <tr>
                        <td class="text-primary">
                          OR Number
                        </td>
                        <td>
                          {{ entry.or_no }}
                        </td>
                         </tr>
                         <tr>
                          <td class="text-primary">
                          CR Number
                        </td>
                        <td>
                          {{ entry.cr_no }}
                        </td>
                        </tr>
                         <tr>
                          <td class="text-primary">
                          Plate Number
                        </td>
                        <td>
                          {{ entry.plate_no }}
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
    ...mapGetters('VehicleSingle', ['entry'])
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
    ...mapActions('VehicleSingle', ['fetchShowData', 'resetState'])
  }
}
</script>
