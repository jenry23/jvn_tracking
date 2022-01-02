<template>
    <div class="full-screen-map">
        <gmap-map
            :center="center"
            :tilt="0"
            :heading="0"
            :zoom="15"
            ref="mapRef"
            :options="{
                mapId: '15431d2b469f209e',
                disableDefaultUI: true,
                preserveViewport: true,
            }"
            style="width: 100%; height: 800px"
        >
            <directions-renderer
                :origin="center"
                :destination="destination"
                :waypoints="waypts"
                travelMode="DRIVING"
            />
            <!-- <gmap-marker
                :options="{
                    preserveViewport: true,
                }"
                :position="center"
            /> -->
        </gmap-map>
        <!-- <div class="card mt-4">
            <div class="card-header" style="background-color: rgb(34, 139, 34)">
                <i class="fa fa-university"></i
                ><strong style="color: white"> Navigation Maps</strong>
            </div>
        </div>
        <button class="btn btn-info" @click="startLocationUpdates">
            <i class="circle dot outline icon large"></i>
            Start Location
        </button>
        <button class="btn btn-info" @click="stopLocationUpdates">
            <i class="circle dot outline icon large"></i>
            Stop Location
        </button> -->
    </div>
</template>

<script>
import { Tween, update, Easing } from "@tweenjs/tween.js";
import DirectionsRenderer from "@components/Maps/DirectionsRenderer";
import * as fb from "../../firebase";

export default {
    components: {
        DirectionsRenderer,
    },
    data() {
        return {
            user: null,
            center: { lat: 0, lng: 0 },
            waypts: [
                {
                    lat: 0,
                    lng: 0,
                },
            ],
            cameraOptions: {},
            markers: [],
            origin: { lat: 0, lng: 0 },
            destination: { lat: 0, lng: 0 },
            position: "",
            watchPositionId: null,
        };
    },
    mounted() {
        this.initMap();
        this.getDirection();
    },
    methods: {
        initMap() {
            this.$refs.mapRef.$mapPromise.then((map) => {
                const trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(map);
                const buttons = [
                    ["Back", "back", google.maps.ControlPosition.TOP_LEFT],
                    ["Scan Passenger", "scan", google.maps.ControlPosition.TOP_LEFT],
                    ["Driving Mode", "driving", google.maps.ControlPosition.RIGHT_BOTTOM,]
                ];

                buttons.forEach(([text, mode, position]) => {
                    const controlDiv = document.createElement("div");
                    const controlUI = document.createElement("button");

                    controlUI.classList.add("ui-button");
                    controlUI.innerText = `${text}`;
                    controlUI.addEventListener("click", () => {
                        adjustMap(mode);
                    });
                    controlDiv.appendChild(controlUI);
                    map.controls[position].push(controlDiv);
                });
                var route_id = this.$route.params.id;
                var self = this;
                  const adjustMap = function (mode) {
                        switch (mode) {
                        case "back":
                            window.history.go(-1);
                            break;
                        case "scan":
                            self.$router.push({ name: 'tickets.passenger', params: { id:route_id  }})
                            break;
                        case "driving":
                            self.drivingMode();
                            break;
                        default:
                            break;
                        }
                    };
            });

            let self = this;
            let marker = [];
            self.watchPositionId = navigator.geolocation.watchPosition(
                (position) => {
                    self.updateLocation(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    marker.push({
                        position: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    });
                },
                (error) => {
                    console.log(error.message);
                }
            );
            self.markers = marker;
        },
        drivingMode() {
            const cameraOptions = {
                tilt: 0,
                heading: 0,
                zoom: 12,
                center: this.center,
            };
            this.$refs.mapRef.$mapPromise.then((map) => {
                new Tween(cameraOptions) // Create a new tween that modifies 'cameraOptions'.
                    .to({ tilt: 65, heading: 90, zoom: 20 }, 15000) // Move to destination in 15 second.
                    .easing(Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                    .onUpdate(() => {
                        map.moveCamera(cameraOptions);
                    })
                    .start(); // Start the tween immediately.

                function animate(time) {
                    requestAnimationFrame(animate);
                    update(time);
                }
                requestAnimationFrame(animate);
            });
        },

        getDirection() {
            var id = this.$route.params.id;
            fb.ticketsCollection.doc(id).onSnapshot((response) => {
                var routeID = response.data().routeID;
                fb.routesCollection.doc(routeID).onSnapshot((response) => {
                    var routeList = response.data();
                    var destinationID = routeList["destination"];
                    var originID = routeList["origin"];
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

                    // fb.locationsCollection
                    //     .doc(originID)
                    //     .onSnapshot((response) => {
                    //         var origin = {
                    //             lat: response.data().latitude,
                    //             lng: response.data().longitude,
                    //         };
                    //         this.origin = origin;
                    //     });

                    waypointsID.forEach((doc) => {
                        fb.locationsCollection.doc(doc).onSnapshot((response) => {
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
            });
        },

        stopLocationUpdates() {
            navigator.geolocation.clearWatch(this.watchPositionId);
        },
        updateLocation(lat, lng) {
            const self = this;
            self.center = {
                lat: lat,
                lng: lng,
            };
            const updateData = {
                latitude: lat,
                longitude: lng,
            };
            fb.db_firebase.ref("driverTrips/NCM4336").update(updateData);
        },
    },
};
</script>
