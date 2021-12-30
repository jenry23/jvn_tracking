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
                                        <input  class="form-control pl-2" v-model="email" type="text" placeholder="Email" @input="updateEmail" id="email" required autocomplete="email"/>
                                    </div>
                                    <div v-if="status1" class="error">
                                          {{status_name}}
                                    </div>
                                </div>
                                <div class="bmd-form-group">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="material-icons">lock_outline</i>
                                            </span>
                                        </div>
                                        <input class="form-control pl-2" v-model="password" type="password" @input="updatePassword" placeholder="Password" id="password1" />
                                    </div>
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="checkbox" name="remember" class="form-check-input" @click="rememberMe()" :checked="this.status_me">
                                        <span class="form-check-sign"><span class="check"></span></span>
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <br>
                            <div class="card-footer justify-content-center flex-column">
                              <vue-button-spinner
                                class="btn-success btn-md"
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
      email:'',
      password:'',
      status_me: false,
      status1: false,
      status_name: '',
      activeField: ''
    }
  },
  computed: {
    ...mapGetters('LoginSingle', ['entry','loading'])
  },
  beforeDestroy() {
    this.resetState()
  },
  mounted(){
    if(this.$cookies.get('email')){
      var email = this.$cookies.get('email');
      var password = this.$cookies.get('password');

      this.email = email;
      this.password = password;
      this.status_me = true;
    }
  },
  methods: {
    ...mapActions('LoginSingle', [
      'LoginData',
      'resetState',
      'remember',
      'setEmail',
      'setPassword'
    ]),
    updateEmail(e) {
      this.setEmail(e.target.value)
    },
    updatePassword(e) {
      this.setPassword(e.target.value)
    },
    rememberMe(){
      this.status_me = true;
    },
     submitForm() {
      this.setEmail(this.email);
      this.setPassword(this.password)
      this.LoginData()
        .then(() => {
        if(this.status_me == true){
          console.log(this.status_me)
            this.$cookies.set('email', this.email, { expires: 14 })
            this.$cookies.set('password', this.password, { expires: 14 })
        }
          console.log('test');
          this.$router.push({ name: 'dashboard' })
          this.$eventHub.$emit('login-success')
        })

        .catch(error => {
          console.log(error)
          this.status1 = true;
          if(error.code == 'auth/user-not-found'){
            this.status_name = 'Email does not exist';
          }else{
             this.status_name = 'Invalid Password';
          }
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
