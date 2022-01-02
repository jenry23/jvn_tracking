<template>
<div>
  <router-link class="btn btn-info" :to="{ name: xprops.route + '.create' }">
    Add Trip Ticket
  </router-link>
    <router-link class="btn btn-primary float-right" :to="{ name: xprops.route + '.history' }">
    History Trip Ticket
  </router-link>
  <div class="row">
  <div class="col-12" v-for="datas in data" :key="datas.id">
    <div class="card text-dark">
      <div class="card-header" style="background-color: #006400;">

    <i class="fa fa-university"> </i> <strong style="color:white;"> Ticket Number : {{ datas.id }}</strong>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <table class="table table-responsive table-sm">
              <tbody>
                <tr>
                  <th class="border-0 w-50">Route ID :</th>
                  <td class="border-0">{{ datas.routeID }}</td>
                </tr>
                <tr>
                  <th>Vehicle ID :</th>
                  <td>{{ datas.vehicleID }}</td>
                </tr>
                <tr>
                  <th>Schedule :</th>
                  <td>{{ datas.startTime }} - {{ datas.endTime }}</td>
                </tr>
                <tr>
                  <th>Status :</th>
                  <td>{{ datas.status }}</td>
                </tr>

              </tbody>
            </table>
               <router-link
                  class="btn btn-info"
                  :to="{ name: xprops.route + '.show', params: { id: datas.id,vehicle: datas.vehicleID } }"
                >
                Show
               </router-link>
               <!-- <router-link
                  class="btn btn-primary"
                  :to="{ name: xprops.route + '.scan', params: { id: datas.id,vehicle: datas.vehicleID } }"
                >
                Scan
               </router-link> -->
                <router-link
                  class="btn btn-primary"
                  :to="{ name: xprops.route + '.locations', params: { id: datas.id } }"
                >
                Start Locations
               </router-link>

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
    return {
      bank_accounts: [],
      xprops: {
        module: 'TicketsIndex',
        route: 'tickets',
        permission_prefix: 'tickets_'
      }
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('TicketsIndex', ['data', 'total', 'loading']),
  },
  mounted() {
    this.fetchIndexData();
    this.AutomaticApprove();
  },
  methods: {
    ...mapActions('TicketsIndex', [
      'fetchIndexData',
      'setQuery',
      'AutomaticApprove',
      'resetState'
    ]),
  }
}
</script>
