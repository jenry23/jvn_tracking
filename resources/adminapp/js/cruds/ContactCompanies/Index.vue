<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-header-primary card-header-icon">
            <div class="card-icon">
              <i class="material-icons">assignment</i>
            </div>
            <h4 class="card-title">
              Table
              <strong>Company</strong>
            </h4>
          </div>
          <div class="card-body">
            <router-link
              class="btn btn-primary"
              :to="{ name: xprops.route + '.create' }"
            >
              <i class="material-icons">
                add
              </i>
              Add
            </router-link>
            <button
              type="button"
              class="btn btn-default"
              @click="fetchIndexData"
              :disabled="loading"
              :class="{ disabled: loading }"
            >
              <i class="material-icons" :class="{ 'fa-spin': loading }">
                refresh
              </i>
              Refresh
            </button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="table-overlay" v-show="loading">
                  <div class="table-overlay-container">
                    <material-spinner></material-spinner>
                    <span>Loading...</span>
                  </div>
                </div>
                <datatable
                  :columns="columns"
                  :data="data"
                  :total="total"
                  :query="query"
                  :xprops="xprops"
                  :HeaderSettings="false"
                  :pageSizeOptions="[10, 25, 50, 100]"
                >
                  <global-search :query="query" class="pull-left" />
                </datatable>
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
import DatatableActions from '@components/Datatables/DatatableActions'
import TranslatedHeader from '@components/Datatables/TranslatedHeader'
import HeaderSettings from '@components/Datatables/HeaderSettings'
import GlobalSearch from '@components/Datatables/GlobalSearch'

export default {
  components: {
    GlobalSearch,
    HeaderSettings
  },
  data() {
    return {
      columns: [
        {
          title: 'ID',
          field: 'id',
          thComp: TranslatedHeader,
          sortable: true,
          colStyle: 'width: 100px;'
        },
        {
          title: 'Company Name',
          field: 'company_name',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'Company Address',
          field: 'company_address',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'Company Website',
          field: 'company_website',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'Company Email',
          field: 'company_email',
          thComp: TranslatedHeader,
          sortable: true
        },
        {
          title: 'Actions',
          thComp: TranslatedHeader,
          tdComp: DatatableActions,
          visible: true,
          thClass: 'text-right',
          tdClass: 'text-right td-actions',
          colStyle: 'width: 150px;'
        }
      ],
      query: { sort: 'id', order: 'desc', limit: 100, s: '' },
      xprops: {
        module: 'ContactCompaniesIndex',
        route: 'contact_companies',
        permission_prefix: 'contact_company_'
      }
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('ContactCompaniesIndex', ['data', 'total', 'loading'])
  },
  watch: {
    query: {
      handler(query) {
        this.setQuery(query)
        this.fetchIndexData()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('ContactCompaniesIndex', [
      'fetchIndexData',
      'setQuery',
      'resetState'
    ])
  }
}
</script>
