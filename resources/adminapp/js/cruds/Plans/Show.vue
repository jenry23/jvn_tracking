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
              {{ $t('global.view') }}
              <strong>{{ $t('cruds.plans.title_singular') }}</strong>
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
                          {{ $t('cruds.plans.fields.id') }}
                        </td>
                        <td>
                          {{ entry.id }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.user.fields.name') }}
                        </td>
                        <td>
                          {{ entry.name }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.plans.fields.cost') }}
                        </td>
                        <td>
                          {{ entry.cost }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-primary">
                          {{ $t('cruds.plans.fields.description') }}
                        </td>
                        <td>
                          {{ entry.description }}
                        </td>
                      </tr>
                    </tbody>
                    <div class="p-2 mb-24 w-full">

                      </div>
                  </div>
                    <label for="card-element" class="leading-7 text-sm text-gray-600">Credit Card Info</label>
                    <div id="card-element"></div>
                     <br>
                    <button
                    class="btn waves-effect waves-light"
                    @click="processPayment"
                    :disabled="paymentProcessing"
                    v-text="paymentProcessing ? 'Processing' : 'Pay Now'"
                ></button>
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
import DatatableList from '@components/Datatables/DatatableList'
import { loadStripe } from '@stripe/stripe-js';

export default {
  components: {
    DatatableList
  },
  data() {
    return {
    stripe: {},   
    cardElement: {},
    paymentProcessing: false
    }
  },
  async mounted() {
      this.stripe = await loadStripe('pk_test_51IShqvDBrLv03ZFnYLiidxC5jiBlzh9EXwlwPeO54cUtCJrgBnicvipCHNaxCbxgyYDG6ecn5kQcznAQfte5qo7C00HAac3a3r');
      const elements = this.stripe.elements();
      this.cardElement = elements.create('card', {
          classes: {
              base: 'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out'
          }
      });
      this.cardElement.mount('#card-element');
  },
  beforeDestroy() {
    this.resetState()
  },
  computed: {
    ...mapGetters('PlansSingle', ['entry','loading'])
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
    ...mapActions('PlansSingle', ['fetchShowData', 'resetState']),
    async processPayment(){
    this.paymentProcessing = true;
    const paymentMethod = await this.stripe.createPaymentMethod(
      'card', this.cardElement, {
          billing_details: {
                  name: this.entry.first_name + ' ' + this.entry.last_name,
                  email: this.entry.email,
                  address: {
                      line1: this.entry.address,
                      city: this.entry.city,
                      state: this.entry.state,
                      postal_code: this.entry.zip_code
                  }
          }
      }
  );
        this.entry.payment_method_id = paymentMethod.id;
        axios.post(`/plans/subscription`).then((response) => {
                this.paymentProcessing = false;
                console.log(response);
            })
            .catch((error) => {
                this.paymentProcessing = false;
                console.error(error);
            });
  },
  }
}
</script>
