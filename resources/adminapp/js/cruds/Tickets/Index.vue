<template>
<div>
  <router-link
          class="btn btn-primary"
          :to="{ name: xprops.route + '.create' }"
        >
    Add Trip Ticket
  </router-link>
  <div class="row">
  <div class="col-12" v-for="datas in data" :key="datas.id">
    <div class="card text-dark">
      <div class="card-header" style="background-color: #228B22;">
   
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
                  :to="{ name: xprops.route + '.show', params: { id: datas.id } }"
                >
                Show
               </router-link>
                   <router-link
                  class="btn btn-danger"
                  :to="{ name: xprops.route + '.scan', params: { id: datas.id } }"
                >
                Scan
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
  },
  methods: {
    ...mapActions('TicketsIndex', [
      'fetchIndexData',
      'setQuery',
      'resetState'
    ])
  }
}
</script>
