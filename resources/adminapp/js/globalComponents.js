import { abilitiesPlugin } from '@casl/vue'
import ability from './services/ability'
import Datatable from '@laraveldaily/vue2-datatable'
import VueSweetalert2 from 'vue-sweetalert2'
import MaterialSpinner from '@components/MaterialSpinner.vue'
import VueButtonSpinner from '@components/VueButtonSpinner.vue'
import BootstrapAlert from '@components/BootstrapAlert.vue'
import SideBar from '@components/SidebarPlugin'
import LanguagesPlugin from '@components/LanguagesPlugin'
import EventHub from '@components/EventHubPlugin'
import BackButton from '@components/BackButton.vue'
import DatetimePicker from '@components/DatetimePicker.vue'
import VueRadio from '@components/VueRadio.vue'
import vSelect from 'vue-select'
import * as VueGoogleMaps from 'vue2-google-maps'
import { Datetime } from 'vue-datetime';
import VueQriously from 'vue-qriously'
import VueCookies from 'vue-cookies';
import VueModal from '@kouts/vue-modal'
import JsonExcel from "vue-json-excel";
import VueTimepicker from 'vue2-timepicker'
import VueQrcodeReader from "vue-qrcode-reader";

const GlobalComponents = {
  install(Vue) {
    Vue.directive('uppercase', {
      update (el) {
        const sourceValue = el.value.replace(/\s+/g, '-');
        const newValue = sourceValue.toUpperCase();

        if (sourceValue !== newValue) {
          el.value = newValue;
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }
      },
    })
    Vue.use(abilitiesPlugin, ability)
    Vue.use(SideBar)
    Vue.use(VueQriously)
    Vue.use(VueCookies)
    Vue.use(LanguagesPlugin)
    Vue.component('Modal', VueModal)
    Vue.use(EventHub)
    Vue.component('datetime', Datetime);
    Vue.use(Datatable)
    Vue.use(VueQrcodeReader);
    Vue.use(VueGoogleMaps, {
      load: {
        key: 'AIzaSyAAOK_-ogfS6sfQoQNmqVDzDcaGNe3S0GA',
        libraries: 'places',
        v: 'beta',
      },
      installComponents: true
    });
    Vue.use(VueSweetalert2)
    Vue.component('vue-timepicker',VueTimepicker);
    Vue.component("downloadExcel", JsonExcel);
    Vue.component('datetime-picker', DatetimePicker)
    Vue.component('back-button', BackButton)
    Vue.component('material-spinner', MaterialSpinner)
    Vue.component('vue-button-spinner', VueButtonSpinner)
    Vue.component('bootstrap-alert', BootstrapAlert)
    Vue.component('v-radio', VueRadio)
    Vue.component('v-select', vSelect)
  }
}

export default GlobalComponents
