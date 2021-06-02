<template>
 <div class="row">
  <div class="col-12">
    <div class="card text-dark">
      <div class="card-header" style="background-color: #228B22;">
   
    <i class="fa fa-university"> </i> <strong style="color:white;"> Scan Passenger</strong>
      </div>
      <div class="card-body">
                <vue-qr-reader
                v-if="show"
                v-on:code-scanned="codeScanned"
                v-on:error-captured="errorCaptured"
                :stop-on-scanned="false"
                :draw-on-found="true"
                :responsive="true"
              />
              {{ scanned }}
          </div>
    </div>
  </div>
  </div>
</template>

<script>
import 'vue-qr-reader';
import VueQrReader from "@components/Qrcode/VueQrReader.vue";
import { mapGetters, mapActions } from 'vuex'

export default {
  components:{
    VueQrReader
  },
  data() {
    return {
      errorMessage: "",
      scanned: "",
      show: true,
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
    ]),
    codeScanned(code) {
      this.scanned = code;
    },
     errorCaptured(error) {
      switch (error.name) {
        case "NotAllowedError":
          this.errorMessage = "Camera permission denied.";
          break;
        case "NotFoundError":
          this.errorMessage = "There is no connected camera.";
          break;
        case "NotSupportedError":
          this.errorMessage =
            "Seems like this page is served in non-secure context.";
          break;
        case "NotReadableError":
          this.errorMessage =
            "Couldn't access your camera. Is it already in use?";
          break;
        case "OverconstrainedError":
          this.errorMessage = "Constraints don't match any installed camera.";
          break;
        default:
          this.errorMessage = "UNKNOWN ERROR: " + error.message;
      }
      console.error(this.errorMessage);
    }
  }
}
</script>
