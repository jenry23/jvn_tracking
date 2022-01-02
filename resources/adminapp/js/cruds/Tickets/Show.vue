<style scoped>
.anyClass {
    height: 300px;
    overflow-y: scroll;
}
</style>
<template>
    <div class="row">
        <div class="col-md-8">
            <GmapMap
                :center="center"
                ref="mapRef"
                :zoom="18"
                style="width: 100%; height: 800px"
            >
                <DirectionsRenderer
                    :origin="this.center"
                    :destination="this.destination"
                    :waypoints="this.waypts"
                    travelMode="DRIVING"
                />
            </GmapMap>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div
                    class="card-header"
                    style="background-color: rgb(34, 139, 34)"
                >
                    <i class="fa fa-university"></i
                    ><strong style="color: white"> Navigation Maps</strong>
                </div>
                <div class="card-body">
                    <div id="panel" class="anyClass"></div>
                </div>
            </div>

            <div class="card">
                <div
                    class="card-header"
                    style="background-color: rgb(34, 139, 34)"
                >
                    <i class="fa fa-university"></i
                    ><strong style="color: white"> Passenger List</strong>
                </div>
                <div
                    class="card-body"
                    v-for="datas in passenger"
                    :key="datas.id"
                >
                    <div v-if="datas.pickup == true">
                        <b>{{ datas.name }}</b> -
                        <i class="material-icons" style="color: green">check</i>
                    </div>
                    <div v-else>
                        <b>{{ datas.name }}</b> -
                        <i class="material-icons" style="color: red">block</i>
                    </div>
                </div>
                <div class="card-body">
                    <div id="panel"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as fb from "../../firebase";
import DirectionsRenderer from "@components/Maps/DirectionsRenderer";
import { gmapApi } from "vue2-google-maps";
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        DirectionsRenderer,
    },
    data() {
        return {
            center: { lat: 0, lng: 0 },
            waypts: [
                {
                    lat: 0,
                    lng: 0,
                },
            ],
            destination: { lat: 0, lng: 0 },
            passenger: [],
            lat: 0,
            lng: 0,
            position: "",
        };
    },
    computed: {
        ...mapGetters("TicketsIndex", ["data", "total", "loading"]),
        google: gmapApi,
    },
    mounted() {
        this.updateData();
        this.updateMarkers();
    },
    methods: {
        ...mapActions("TicketsIndex", ["setQuery", "resetState"]),
        signOutButtonPressed() {
            fb.auth
                .signOut()
                .then((user) => {
                    this.$router.push({
                        name: "/",
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
        updateData() {
            var id = this.$route.params.id;
            const self = this;
            var query = fb.db_firebase.ref("driverTrips/");
            var vehicle = this.$route.params.vehicle;
            query.on("value", function (snapshot) {
                var value = snapshot.val()[vehicle];
                var latitude = parseFloat(value.latitude);
                var longitude = parseFloat(value.longitude);
                self.center = {
                    lat: latitude,
                    lng: longitude,
                };
            });
            fb.ticketsCollection.doc(id).onSnapshot((response) => {
                var passengerList = response.data().passengerID;
                var routeID = response.data().routeID;
                fb.routesCollection.doc(routeID).onSnapshot((response) => {
                    var routeList = response.data();
                    var destinationID = routeList["destination"];
                    var waypointsID = routeList["pitstops"];
                    var waypointsLocation = [];
                    fb.locationsCollection
                        .doc(destinationID)
                        .onSnapshot((response) => {
                            var destination = {
                                lat: response.data().latitude,
                                lng: response.data().longitude,
                            };
                            this.destination = destination;
                        });
                    waypointsID.forEach((doc) => {
                        fb.locationsCollection
                            .doc(doc)
                            .onSnapshot((response) => {
                                waypointsLocation.push({
                                    location: {
                                        lat: response.data().latitude,
                                        lng: response.data().longitude,
                                    },
                                    stopover: true,
                                });
                            });
                    });
                    this.waypts = waypointsLocation;
                });
                this.passenger = passengerList;
            });
        },
        updates: function () {
            this.$refs.mapRef.$mapPromise.then((map) => {
                const trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(map);
            });
        },
    },
};
</script>
