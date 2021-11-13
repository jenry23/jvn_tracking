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
      var directions = new google.maps.DirectionsRenderer({suppressMarkers: true});

      var icons = {
          start: new google.maps.MarkerImage(
          // URL
          'http://maps.google.com/mapfiles/ms/micons/blue.png',
          // (width,height)
          new google.maps.Size(44, 32),
          // The origin point (x,y)
          new google.maps.Point(0, 0),
          // The anchor point (x,y)
          new google.maps.Point(22, 32)),
          end: new google.maps.MarkerImage(
          // URL
          'http://maps.google.com/mapfiles/ms/micons/green.png',
          // (width,height)
          new google.maps.Size(44, 32),
          // The origin point (x,y)
          new google.maps.Point(0, 0),
          // The anchor point (x,y)
          new google.maps.Point(22, 32))
      };
  
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
            var leg = response.routes[0].legs[0];
            console.log(leg.start_location);
            makeMarker(leg.start_location, icons.start, "title");
            makeMarker(leg.end_location, icons.end, 'title');
          }
        );

      }
    );
  }
  
});
