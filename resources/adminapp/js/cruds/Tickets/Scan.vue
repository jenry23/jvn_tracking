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
          </div>
    </div>
  </div>
  </div>
</template>

<script>
import 'vue-qr-reader';
import VueQrReader from "@components/Qrcode/VueQrReader.vue";
import { mapGetters, mapActions } from 'vuex'
import * as fb from '../../firebase'
import firebase from 'firebase/app'

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
      var id = this.$route.params.id;
      var ticketRef = fb.ticketsCollection.doc(id);
      fb.ticketsCollection.doc(id).get().then(response=>{
        var passengerID  = response.data().passengerID;
        passengerID.forEach((doc)=>{
          if(code == doc.id){
            if(doc.pickup == false || doc.pickup == '')
                {
                  ticketRef.update({
                        passengerID: firebase.firestore.FieldValue.arrayUnion({
                          name:doc.name,
                          id:doc.id,
                          pickup:true
                        })
                  });

                  this.$swal({
                    title: 'Successfully Updated',
                    text: doc.name,
                    type: 'info',
                    showCancelButton: true,
                    focusCancel: true,
                    reverseButtons: true
                  })
          }else if(doc.pickup == true){
              this.$swal({
                    title: 'You are Already Scanned',
                    text: doc.name,
                    type: 'warning',
                    showCancelButton: true,
                    focusCancel: true,
                    reverseButtons: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#dd4b39',
                  })
                const removeArray = {
                  name:doc.name,
                  id:doc.id,
                  pickup:false
                }
                ticketRef.update({
                      passengerID: firebase.firestore.FieldValue.arrayRemove(removeArray),
                });
            }else{
              this.$swal({
                title: 'You are not Register in this Van',
                type: 'warning',
                showCancelButton: true,
                focusCancel: true,
                reverseButtons: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#dd4b39',
              })
            }
          }
        });
      });
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
