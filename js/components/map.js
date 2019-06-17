var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

/* global google */

module.exports = page => {
    page.querySelectorAll('.contact__map').forEach( el => {
        var center = {
            lat: Number( el.dataset.lat ),
            lng: Number( el.dataset.lng )
        }
        var map = new google.maps.Map( el, {
            center,
            zoom: Number( el.dataset.zoom ),
            gestureHandling: 'cooperative',
            styles
        })
        new google.maps.Marker({
            position: center,
            map
        });
    })
}

// var loc_{{ map_id }} = {lat: {{ item.map.lat }}, lng: {{ item.map.lng }}};
//         map_{{ map_id }} = new google.maps.Map(document.getElementById("map_{{ map_id }}"), {
//             center: loc_{{ map_id }},
//             zoom: {{ item.map.zoom }},
//             gestureHandling: 'cooperative',
//             styles: [
//               {
//                 "elementType": "geometry",
//                 "stylers": [
//                   {
//                     "color": "#f5f5f5"
//                   }
//                 ]
//               },
//               {
//                 "elementType": "labels.icon",
//                 "stylers": [
//                   {
//                     "visibility": "off"
//                   }
//                 ]
//               },
//               {
//                 "elementType": "labels.text.fill",
//                 "stylers": [
//                   {
//                     "color": "#616161"
//                   }
//                 ]
//               },
//               {
//                 "elementType": "labels.text.stroke",
//                 "stylers": [
//                   {
//                     "color": "#f5f5f5"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "administrative.land_parcel",
//                 "elementType": "labels.text.fill",
//                 "stylers": [
//                   {
//                     "color": "#bdbdbd"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "poi",
//                 "elementType": "geometry",
//                 "stylers": [
//                   {
//                     "color": "#eeeeee"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "poi",
//                 "elementType": "labels.text.fill",
//                 "stylers": [
//                   {
//                     "color": "#757575"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "poi.park",
//                 "elementType": "geometry",
//                 "stylers": [
//                   {
//                     "color": "#e5e5e5"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "poi.park",
//                 "elementType": "labels.text.fill",
//                 "stylers": [
//                   {
//                     "color": "#9e9e9e"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "road",
//                 "elementType": "geometry",
//                 "stylers": [
//                   {
//                     "color": "#ffffff"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "road.arterial",
//                 "elementType": "labels.text.fill",
//                 "stylers": [
//                   {
//                     "color": "#757575"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "road.highway",
//                 "elementType": "geometry",
//                 "stylers": [
//                   {
//                     "color": "#dadada"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "road.highway",
//                 "elementType": "labels.text.fill",
//                 "stylers": [
//                   {
//                     "color": "#616161"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "road.local",
//                 "elementType": "labels.text.fill",
//                 "stylers": [
//                   {
//                     "color": "#9e9e9e"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "transit.line",
//                 "elementType": "geometry",
//                 "stylers": [
//                   {
//                     "color": "#e5e5e5"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "transit.station",
//                 "elementType": "geometry",
//                 "stylers": [
//                   {
//                     "color": "#eeeeee"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "water",
//                 "elementType": "geometry",
//                 "stylers": [
//                   {
//                     "color": "#c9c9c9"
//                   }
//                 ]
//               },
//               {
//                 "featureType": "water",
//                 "elementType": "labels.text.fill",
//                 "stylers": [
//                   {
//                     "color": "#9e9e9e"
//                   }
//                 ]
//               }
//             ]
//         });
//         var marker_{{ map_id }} = new google.maps.Marker({
//             position: loc_{{ map_id }},
//             map: map_{{ map_id }},
//         });