<template>
 <div class="wrapper wrapper-full-page">
    <div class="page-header login-page header-filter">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
                    <form @submit.prevent="submitForm">
                        <div class="card card-login">
                            <div class="card-header card-header-primary text-center">
                                <h4 class="card-title">Login</h4>
                            </div>
                            <div class="card-body">
                            <center>
                                <h3>JVN Consultancy And Genereal Services</h3>
                                </center>
                                <div class="bmd-form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="material-icons">email</i>
                                            </span>
                                        </div>
                                        <input  class="form-control pl-2"  :value="entry.email" type="text" placeholder="Email" @input="updateEmail" id="email" required autocomplete="email"/>
                                    </div>

                                </div>
                                <div class="bmd-form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="material-icons">lock_outline</i>
                                            </span>
                                        </div>
                                        <input class="form-control pl-2" :value="entry.password" type="password" @input="updatePassword" placeholder="Password" id="password1" />
                                    </div>
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="checkbox" name="remember" class="form-check-input">
                                        <span class="form-check-sign"><span class="check"></span></span>
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div class="card-footer justify-content-center flex-column">
                              <vue-button-spinner
                                class="btn-primary"
                                :status="status"
                                :isLoading="loading"
                                :disabled="loading"
                            >
                            Login
                            </vue-button-spinner>
                            </div>
                        </div>
                    </form>
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
      status: '',
      activeField: ''
    }
  },
  computed: {
    ...mapGetters('LoginSingle', ['entry','loading'])
  },
  beforeDestroy() {
    this.resetState()
  },
  methods: {
    ...mapActions('LoginSingle', [
      'LoginData',
      'resetState',
      'setEmail',
      'setPassword'
    ]),
    updateEmail(e) {
      this.setEmail(e.target.value)
    },
    updatePassword(e) {
      this.setPassword(e.target.value)
    },
     submitForm() {
      this.LoginData()
        .then(() => {
        console.log('success');
          this.$router.push({ name: 'dashboard' })
          this.$eventHub.$emit('login-success')
        })
        .catch(error => {
        console.log('failed');
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