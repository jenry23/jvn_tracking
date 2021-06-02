<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <router-link
              class="btn btn-primary"
              v-if="$can(xprops.permission_prefix + 'create')"
              :to="{ name: xprops.route + '.create' }"
            >
              <i class="material-icons">
                add
              </i>
              Add Maps Route
        </router-link>
         <div id="app">
            <GoogleMap />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import GoogleMap from '@components/Maps/GoogleMap'
import { mapGetters, mapActions } from 'vuex'
import HeaderSettings from '@components/Datatables/HeaderSettings'
import GlobalSearch from '@components/Datatables/GlobalSearch'

export default {
  components: {
    GlobalSearch,
    HeaderSettings,
    GoogleMap
  },
  data() {
    return {
      xprops: {
        module: 'MapRouteIndex',
        route: 'map_route',
        permission_prefix: 'map_route_'
      }
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('MapRouteIndex', ['data', 'total', 'loading'])
  },
  mounted(){
    // this.fetchIndexData();
  },
  methods: {
    ...mapActions('MapRouteIndex', [
      'fetchIndexData',
      'setQuery',
      'resetState'
    ]),
    getList: function(list) {
    this.todoList = list;
    }
  }
}
</script>
