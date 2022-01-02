<template>
    <div
        :class="{ fullscreen: fullscreen }"
        ref="wrapper"
        @fullscreenchange="onFullscreenChange"
    >
        <qrcode-stream
            @decode="onDecode"
            @init="onInit"
            :track="this.paintBoundingBox"
        >
            <back-button></back-button>
            <!-- <button @click="back" class="fullscreen-button">back
            </button> -->
        </qrcode-stream>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as fb from "../../firebase";
import firebase from "firebase/app";

export default {
    data() {
        return {
            camera: "auto",
            fullscreen: true,
            result: null,
            showScanConfirmation: false,
            xprops: {
                module: "TicketsIndex",
                route: "tickets",
                permission_prefix: "tickets_",
            },
        };
    },
    beforeDestroy() {
        this.resetState();
    },
    computed: {
        ...mapGetters("TicketsIndex", ["data", "total", "loading"]),
        fullscreenIcon() {
            if (this.fullscreen) {
                return "/fullscreen-exit.svg";
            } else {
                return "/fullscreen.svg";
            }
        },
    },

    watch: {
        fullscreen(enterFullscreen) {
            if (enterFullscreen) {
                this.requestFullscreen();
            } else {
                this.exitFullscreen();
            }
        },
    },

    methods: {
        ...mapActions("TicketsIndex", ["setQuery", "resetState"]),
        paintBoundingBox(detectedCodes, ctx) {
            for (const detectedCode of detectedCodes) {
                const {
                    boundingBox: { x, y, width, height },
                } = detectedCode;

                ctx.lineWidth = 2;
                ctx.strokeStyle = "#007bff";
                ctx.strokeRect(x, y, width, height);
            }
        },
        codeScanned(code) {
            this.scanned = code;
            var id = this.$route.params.id;
            var status = this.$route.params.status;
            var ticketRef = fb.ticketsCollection.doc(id);

            ticketRef.get().then((response) => {
                var passengerID = response.data().passengerID;
                var value = this.searchStringInArray(code, passengerID);
                if (value.start_time && status == "pickup") {
                    this.$swal({
                        title: "You are Already Scanned To Pickup Time",
                        text: value.name,
                        type: "warning",
                        showCancelButton: true,
                        focusCancel: true,
                        reverseButtons: true,
                        confirmButtonText: "OK",
                        confirmButtonColor: "#dd4b39",
                    });
                } else if (value.end_time && status == "dropoff") {
                    this.$swal({
                        title: "You are Already Scanned To Dropoff Time",
                        text: value.name,
                        type: "warning",
                        showCancelButton: true,
                        focusCancel: true,
                        reverseButtons: true,
                        confirmButtonText: "OK",
                        confirmButtonColor: "#dd4b39",
                    });
                } else {
                    var today = new Date();
                    var time = today.getHours() + ":" + today.getMinutes();
                    ticketRef.update({
                        passengerID: passengerID.filter(
                            (passenger) => passenger.id !== value.id
                        ),
                    });
                    ticketRef.update({
                        passengerID: firebase.firestore.FieldValue.arrayUnion({
                            name: value.name,
                            id: value.id,
                            pickup: true,
                            start_time: status == "pickup" ? time : value.start_time,
                            end_time: status == "dropoff" ? time : value.end_time,
                        }),
                    });
                     this.$swal({
                        title: 'Successfully Updated',
                        text: value.name,
                        type: 'info',
                        showCancelButton: true,
                        focusCancel: true,
                        reverseButtons: true
                      })
                }
            });
        },
        async onInit(promise) {
            try {
                await promise;
            } catch (e) {
                console.error(e);
            } finally {
                this.showScanConfirmation = this.camera === "off";
            }
        },

        async onDecode(content) {
            this.result = content;
            this.codeScanned(content);
            this.pause();
            await this.timeout(8000);
            this.unpause();
        },

        unpause() {
            this.camera = "auto";
        },

        pause() {
            this.camera = "off";
        },

        timeout(ms) {
            return new Promise((resolve) => {
                window.setTimeout(resolve, ms);
            });
        },
        onFullscreenChange(event) {
            // This becomes important when the user doesn't use the button to exit
            // fullscreen but hits ESC on desktop, pushes a physical back button on
            // mobile etc.

            this.fullscreen = document.fullscreenElement !== null;
        },
        searchStringInArray(str, strArray) {
            for (var j = 0; j < strArray.length; j++) {
                if (strArray[j].id.match(str)) return strArray[j];
            }
            this.$swal({
                title: "You are not Register in this Van",
                type: "warning",
                showCancelButton: true,
                focusCancel: true,
                reverseButtons: true,
                confirmButtonText: "OK",
                confirmButtonColor: "#dd4b39",
            });
            return false;
        },
        requestFullscreen() {
            const elem = this.$refs.wrapper;

            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                /* IE/Edge */
                elem.msRequestFullscreen();
            }
        },

        exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                /* IE/Edge */
                document.msExitFullscreen();
            }
        },
    },
};
</script>
<style scoped>
.fullscreen {
    position: fixed;
    z-index: 1000;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}

.fullscreen-button {
    background-color: white;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1rem;
}
.fullscreen-button img {
    width: 2rem;
}
</style>
