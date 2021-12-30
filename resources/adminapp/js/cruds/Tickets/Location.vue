<style scoped>
/* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
#map {
    height: 100%;
}

/* Optional: Makes the sample page fill the window. */
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

.ui-button {
    background-color: #fff;
    border: 0;
    border-radius: 2px;
    box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
    margin: 10px;
    padding: 0 0.5em;
    font: 400 18px Roboto, Arial, sans-serif;
    overflow: hidden;
    height: 40px;
    cursor: pointer;
}
.ui-button:hover {
    background: #ebebeb;
}
</style>
<template>
    <div>
        <div id="map" style="width: 100%; height: 800px" class="map"></div>
        <!-- <div class="latLngLabel">{{ lat }}, {{ lng }}</div> -->
        <div class="card mt-4">
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
        </button>

        <!-- <button class="btn btn-danger" @click="stopLocationUpdates">
        <i class="circle dot outline icon large"></i>
        Stop Location
      </button> -->
    </div>
</template>

<script>
import { Tween, update, Easing } from "@tweenjs/tween.js";
import * as fb from "../../firebase";
let map;

export default {
    data() {
        return {
            user: null,
            center: { lat: 0, lng: 0 },
            start: { lat: 14.193335, lng: 121.280489 },
            marker: { lat: 14.189372, lng: 121.336771 },
            routingService: {},
            position: "",
            lat: 0, lng: 0,
            watchPositionId: null,
            waypts : [{
                lat:0,
                lng:0
            }],
            destination: { lat: 0, lng: 0},
        };
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    tilt: 0,
                    heading: 0,
             })
            var marker = new google.maps.Marker({
                map: map,
            });
            const trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map)

            this.watchPositionId = navigator.geolocation.watchPosition(
                (position) => {
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                    this.updateLocation(position.coords.latitude, position.coords.longitude);
                    map.setCenter(new google.maps.LatLng(this.lat, this.lng));
                    marker.setPosition(new google.maps.LatLng(this.lat, this.lng));
                },
                (error) => {
                    console.log(error.message);
                }
            );
            var directionsRenderer = new google.maps.DirectionsRenderer();
            var directionsService = new google.maps.DirectionsService();

            this.calculateAndDisplayRoute(
                directionsService,
                directionsRenderer
            );
            directionsRenderer.setMap(map);
        },
        startLocationUpdates() {
            const cameraOptions = {
                tilt: 0,
                heading: 0,
                zoom: 12,
                center: this.center,
            };
            const mapOptions = {
                ...cameraOptions,
                mapId: "15431d2b469f209e",
                preserveViewport: true,
            };
            map = new google.maps.Map(
                document.getElementById("map"),
                mapOptions
            );
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
            const buttons = [
                [
                    "Rotate Left",
                    "rotate",
                    20,
                    google.maps.ControlPosition.LEFT_CENTER,
                ],
                [
                    "Rotate Right",
                    "rotate",
                    -20,
                    google.maps.ControlPosition.RIGHT_CENTER,
                ],
                [
                    "Tilt Down",
                    "tilt",
                    20,
                    google.maps.ControlPosition.TOP_CENTER,
                ],
                [
                    "Tilt Up",
                    "tilt",
                    -20,
                    google.maps.ControlPosition.BOTTOM_CENTER,
                ],
            ];

            buttons.forEach(([text, mode, amount, position]) => {
                const controlDiv = document.createElement("div");
                const controlUI = document.createElement("button");

                controlUI.classList.add("ui-button");
                controlUI.innerText = `${text}`;
                controlUI.addEventListener("click", () => {
                    adjustMap(mode, amount);
                });
                controlDiv.appendChild(controlUI);
                map.controls[position].push(controlDiv);
            });

            const adjustMap = function (mode, amount) {
                switch (mode) {
                    case "tilt":
                        map.setTilt(map.getTilt() + amount);
                        break;
                    case "rotate":
                        map.setHeading(map.getHeading() + amount);
                        break;
                    default:
                        break;
                }
            };

              var icons = {
                start: new google.maps.MarkerImage(
                    // URL
                    "http://maps.google.com/mapfiles/kml/pal4/icon15.png",
                    // (width,height)
                    new google.maps.Size(44, 32),
                    // The origin point (x,y)
                    new google.maps.Point(0, 0),
                    // The anchor point (x,y)
                    new google.maps.Point(22, 32)
                ),
            };
            var marker = new google.maps.Marker({
                position: this.center,
                map: map,
                icon: icons.start,
            });

            var directionsRenderer = new google.maps.DirectionsRenderer();
            var directionsService = new google.maps.DirectionsService();

            this.calculateAndDisplayRoute(
                directionsService,
                directionsRenderer
            );
            directionsRenderer.setMap(map);
        },

        calculateAndDisplayRoute(directionsService, directionsRenderer) {
            const waypts = [
                {
                    location: {
                        lat: 14.077069,
                        lng: 121.194123,
                    },
                    stopover: true,
                },
            ];
            var start = this.start;
            var end = this.marker;
            directionsRenderer.setOptions({
                preserveViewport: true,
            });

            directionsService.route(
                {
                    origin: start,
                    destination: end,
                    // waypoints: waypts,
                    drivingOptions: {
                        departureTime: new Date(Date.now()), // for the time N milliseconds from now.
                        trafficModel: "optimistic",
                    },
                    travelMode: "DRIVING",
                },
                (response, status) => {
                    if (status == "OK") {
                        directionsRenderer.setDirections(response);
                    } else {
                        window.alert(
                            "Directions request failed due to " + status
                        );
                    }
                }
            );
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
            console.log(self.center);
            const updateData = {
                latitude: lat,
                longitude: lng,
            };
            fb.db_firebase.ref("driverTrips/test").update(updateData);
        },
    },
};
</script>
