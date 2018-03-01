/*
Map markers
*/
const centerMark = [18.972711, 72.804394];
let mumbaiMarkers = [
  ['Gateway of India', 18.921984, 72.834654],
  ['ChurchGate', 18.935323, 72.827159],
  ['Bandra Worli Sea Link', 19.030149, 72.81561],
  ['Sanjay Gandhi National Park', 19.221035, 72.906792],
  ['Breach Candy Hospital', 18.972711, 72.804394],
  ['The Oberoi Hotel', 18.926975, 72.820452],
  ['Horniman Circle', 18.931832, 72.836156],
  ['Nehru Planetorium', 18.990059, 72.814797],
  ['Chhatrapati Shivaji Terminus Area', 18.94487, 72.833672],
  ['Metro Inox Cinema', 18.943013, 72.828878]
];
const timeout = 3000;
var map;

function AppViewModel() {
  var self = this;

  this.m_markers = [
  ['Gateway of India'],
  ['ChurchGate'],
  ['Bandra Worli Sea Link'],
  ['Sanjay Gandhi National Park'],
  ['Breach Candy Hospital'],
  ['The Oberoi Hotel'],
  ['Horniman Circle'],
  ['Nehru Planetorium'],
  ['Chhatrapati Shivaji Terminus Area'],
  ['Metro Inox Cinema']
  ];

  this.m_selected_markers = [];
  this.searchOption = ko.observable("");

  this.populateInfoWindow = function(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;
            infowindow.setContent("Hello");
            infowindow.open(map, marker);

            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    };

  this.populateAndBounceMarker = function() {
        self.populateInfoWindow(this, self.largeInfoWindow);
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 1400);
  };

  this.showMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: new google.maps.LatLng(centerMark[0], centerMark[1]),
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      this.locationInfoWindow = new google.maps.InfoWindow();
        for (let j = 0; j < mumbaiMarkers.length; j++) {
            this.locationTitle = mumbaiMarkers[j][0];
            this.locationLat = mumbaiMarkers[j][1];
            this.locationLng = mumbaiMarkers[j][2];

            this.marker = new google.maps.Marker({
                map: map,
                position: {
                    lat: this.locationLat,
                    lng: this.locationLng
                },
                title: this.locationTitle,
                lat: this.locationLat,
                lng: this.locationLng,
                id: j,
                animation: google.maps.Animation.DROP
            });
            this.marker.setMap(map);
            this.m_selected_markers.push(this.marker);
            this.marker.addListener('click', self.showInfoAndAnimate);
        }
    }

  this.showMap();

  this.myLocationsFilter = ko.computed(function() {
        var result = [];
        for (var i = 0; i < this.m_selected_markers.length; i++) {
            var markerLocation = this.m_selected_markers[i];
            if (markerLocation.title.toLowerCase().includes(this.searchOption()
                    .toLowerCase())) {
                result.push(markerLocation);
                this.m_selected_markers[i].setVisible(true);
            } else {
                this.m_selected_markers[i].setVisible(false);
            }
        }
        return result;
    }, this);
}

function initMap() {
  ko.applyBindings(new AppViewModel());
}