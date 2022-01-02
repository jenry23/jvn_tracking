import { MapElementFactory } from "vue2-google-maps";

export default MapElementFactory({
  name: "directionsRenderer",

  ctr() {
    return window.google.maps.DirectionsRenderer;
  },

  events: ['directions_changed'],

  mappedProps: {
    options: { zoomControl: false },
  },

  props: {
    origin: { type: Object },
    destination: { type: Object },
    waypoints: { type: Array },
    travelMode: { type: String }
  },
  afterCreate(directionsRenderer) {
    let directionsService = new window.google.maps.DirectionsService();

    this.$watch(
      () => [this.origin, this.destination,this.waypoints, this.travelMode],
      () => {
        let { origin, destination,waypoints, travelMode } = this;
        if (!origin || !destination || !waypoints || !travelMode) return;

      function makeMarker(position, icon, title) {
        new google.maps.Marker({
            position: position,
            icon: icon,
            title: title
        });
      }
        directionsRenderer.setOptions({
          preserveViewport : true
        });
        directionsRenderer.setPanel(document.getElementById('panel'));
        directionsService.route(
          {
            origin,
            destination,
            travelMode,
            waypoints,
            provideRouteAlternatives: true,
            optimizeWaypoints: true,
          },
          (response, status) => {
            if (status !== "OK");
            directionsRenderer.setDirections(response);
          }
        );

      }
    );
  }

});
