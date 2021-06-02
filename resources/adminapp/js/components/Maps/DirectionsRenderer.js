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
    travelMode: { type: String }
  },
  afterCreate(directionsRenderer) {
    let directionsService = new window.google.maps.DirectionsService();
  
    this.$watch(
      () => [this.origin, this.destination, this.travelMode],
      () => {
        let { origin, destination, travelMode } = this;
        if (!origin || !destination || !travelMode) return;
        
        directionsRenderer.setOptions({
          preserveViewport : true
        });
        directionsRenderer.setPanel(document.getElementById('panel'));
        directionsService.route(
          {
            origin,
            destination,
            travelMode,
            drivingOptions: {
              departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
              trafficModel: 'optimistic'
            },
            avoidTolls: true
          },
          (response, status) => {
            if (status !== "OK") return;
            directionsRenderer.setDirections(response);
          }
        );
      }
    );
  }
});
