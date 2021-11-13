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
                <strong>Roles</strong>
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
                      'has-items': entry.title,
                      'is-focused': activeField == 'title'
                    }"
                  >
                    <label class="bmd-label-floating required">Title</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.title"
                      @input="updateTitle"
                      @focus="focusField('title')"
                      @blur="clearFocus"
                      required
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.companyID,
                      'is-focused': activeField == 'companyID'
                    }"
                  >
                    <label class="bmd-label-floating required">Company</label>
                    <v-select 
                      name="companyID"
                      label="company_name"
                      :value="entry.companyID"
                      :options="lists.companyID"
                      @input="updateCompanyID"
                      @focus="focusField('companyID')"
                      @blur="clearFocus"
                      required
                      />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'has-items': entry.permissions.length !== 0,
                      'is-focused': activeField == 'permissions'
                    }"
                  >
                    <label class="bmd-label-floating required">Permissions</label>
                    <v-select
                      name="permissions"
                      label="title"
                      :key="'permissions-field'"
                      :value="entry.permissions"
                      :options="lists.permissions"
                      :closeOnSelect="false"
                      multiple
                      @input="updatePermissions"
                      @focus="focusField('permissions')"
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
    ...mapGetters('RolesSingle', ['entry', 'loading', 'lists'])
  },
  mounted() {
    this.fetchCreateData()
  },
  beforeDestroy() {
    this.resetState()
  },
  methods: {
    ...mapActions('RolesSingle', [
      'storeData',
      'resetState',
      'setTitle',
      'setCompanyID',
      'setPermissions',
      'fetchCreateData'
    ]),
    updateCompanyID(value){
      this.setCompanyID(value)
    },
    updateTitle(e) {
      this.setTitle(e.target.value)
    },
    updatePermissions(value) {
      this.setPermissions(value)
    },
    submitForm() {
      this.storeData()
        .then(() => {
          this.$router.push({ name: 'roles.index' })
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
