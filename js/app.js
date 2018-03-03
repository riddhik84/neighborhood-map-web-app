let map;
//Foursquare keys
const ClientID = 'MMZUPIANXU45JYXZFMJQ1TTFPHWNEUL5R4W4DMPFMPFPNW4F';
const ClientSecret = 'ZNGSP4YKZI5UMURCA2XXKDR2ZHPX5RKATQNYWOS1HQ1U1SC4';
//Locations info of mumbai
const centerMark = [18.972711, 72.804394];
const mumbaiMarkers = [
    {
        title: 'Gateway of India',
        lat: 18.921984,
        lng: 72.834654,
        placeId: 'ChIJrVwNOsfR5zsRPHOcIKclCsc',
        type: 'visit'
    },
    {
        title: 'ChurchGate',
        lat: 18.935323,
        lng: 72.827159,
        placeId: 'ChIJxbBgE-fR5zsRK6Osdf6NDnE',
        type: 'railway'
    },
    {
        title: 'Bandra Worli Sea Link',
        lat: 19.030149,
        lng: 72.81561,
        placeId: 'ChIJkWQ8sq_O5zsRIY-SEEQJzAQ',
        type: 'visit'
    },
    {
        title: 'Marine Drive',
        lat: 18.941482,
        lng: 72.823679,
        placeId: 'ChIJHV_-3OHR5zsRae7zmuEA3C0',
        type: 'visit'
    },
    {
        title: 'Breach Candy Hospital',
        lat: 18.972711,
        lng: 72.804394,
        placeId: 'ChIJhUrr0XfO5zsRksrvRinMDC4',
        type: 'hospital'
    },
    {
        title: 'The Oberoi Hotel',
        lat: 18.926975,
        lng: 72.820452,
        placeId: 'ChIJ____b-nR5zsRwb4q2GWqXjg',
        type: 'hotel'
    },
    {
        title: 'Horniman Circle Garden',
        lat: 18.931832,
        lng: 72.836156,
        placeId: 'ChIJq8BfSdvR5zsRZn_7hsntjJc',
        type: 'visit'
    },
    {
        title: 'Nehru Planetorium',
        lat: 18.990059,
        lng: 72.814797,
        placeId: 'ChIJbe7Eh1dm0zsRDMU_v5H-qcs',
        type: 'visit'
    },
    {
        title: 'Chhatrapati Shivaji Terminus Area',
        lat: 18.94487,
        lng: 72.833672,
        placeId: 'ChIJj_J-WyfO5zsR0ZBPL83Gu4s',
        type: 'railway'
    },
    {
        title: 'Haji Ali Dargah',
        lat: 18.982819,
        lng: 72.808896,
        placeId: 'ChIJefVzk37O5zsRVbE1WoGalIU',
        type: 'temple'
    },
    {
        title: 'Hanging Garden',
        lat: 18.958215,
        lng: 72.806312,
        placeId: 'ChIJn3Q-5QnO5zsRmouUzzMGp5Q',
        type: 'visit'
    }
];
//Icons to pin on map based on location type
var icons = {
    temple: {
            icon: 'http://maps.google.com/mapfiles/kml/pal2/icon2.png'
        },
    railway: {
            icon: 'http://maps.google.com/mapfiles/kml/pal2/icon5.png'
        },
    visit: {
            icon: 'http://maps.google.com/mapfiles/kml/pal4/icon38.png'
        },
    hospital: {
            icon: 'http://maps.google.com/mapfiles/kml/pal3/icon38.png'
        },
    hotel: {
            icon: 'http://maps.google.com/mapfiles/kml/pal3/icon21.png'
        }
};
/**
* @description knockout model function
* @constructor
*/
function AppViewModel() {
    var self = this;

    this.m_markers = [];
    this.searchResults = ko.observable("");

    /**
    * @description a function to show map, create info window and markers
    */
    this.showMap = function() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: new google.maps.LatLng(centerMark[0], centerMark[1]),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        this.mapInfoWindow = new google.maps.InfoWindow();
        for (var k = 0; k < mumbaiMarkers.length; k++) {
            this.markerTitle = mumbaiMarkers[k].title;
            this.markerLat = mumbaiMarkers[k].lat;
            this.markerLng = mumbaiMarkers[k].lng;
            this.markerPlaceId = mumbaiMarkers[k].placeId;
            this.markerPlaceType = mumbaiMarkers[k].type;
            this.marker = new google.maps.Marker({
                map: map,
                position: {
                    lat: this.markerLat,
                    lng: this.markerLng
                },
                title: this.markerTitle,
                lat: this.markerLat,
                lng: this.markerLng,
                placeId: this.markerPlaceId,
                icon: icons[this.markerPlaceType].icon,
                id: k
            });
            this.marker.setMap(map);
            this.m_markers.push(this.marker);
            this.marker.addListener('click', self.animateAndPopMarker);
        }
    };

    /**
    * @description When a marker is clicked, animate and show the infowindow to the user
    * The infowindow contains info captured using Forsquare APIs
    * Preffered method: Usage of places APIs where forsquare is not much popular
    */
    this.animateAndPopMarker = function() {
        let marker = this;
        let infowindow = self.mapInfoWindow;

        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;

            var infoWindowContent = '';
            let location_name = marker.title;
            let address = '';
            let crossStreet = '';
            let city = '';

            fsURL = 'https://api.foursquare.com/v2/venues/search?ll='+ marker.lat + ',' + marker.lng + '&client_id=' + ClientID + '&client_secret='+ ClientSecret + '&v=20180302';

            $.getJSON(fsURL).done(function(marker) {
                var res = marker.response.venues[0];
                console.log(res);
                location_name = res.name;
                //console.log(location_name);
                address = res.location.address;
                city = res.location.city;

                infoWindowContent = '<div><strong>' + location_name + '</strong><br>'+  address + '</div>'+  crossStreet + '</div>'+  city + '</div>'+ '</br>'+  '<IMG BORDER="0" ALIGN="center" SRC="images/Foursquare300.png">';
                console.log("infoWindowContent: ", infoWindowContent);
                infowindow.setContent(infoWindowContent);

                //fsVanueURL = 'https://api.foursquare.com/v2/venues/'
                //vanue_Id+'?&oauth_token=4XLQECEG3ZF0YP4CAGFS21ROIH25K3JKS5CUKZEDLRCCHRXB&v=20180302';
                }).fail(function() {
                    alert("Failed to load Foursquare API");
                });
            infowindow.open(map, marker);
            }
            /*var service = new google.maps.places.PlacesService(map);
            service.getDetails({placeId: marker.placeId},
                function(place, status) {
                    console.log("status: ", status);
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        infoWindowContent = '<div><strong>' + place.name + '</strong><br>' +
                        place.formatted_address + '</div>';
                    } else {
                        infoWindowContent = '<div><strong>' + marker.title + '</strong><br>' +
                        'Lat: ' + marker.lat + '<br>' +
                        'Lng: ' + marker.lng + '</div>';
                    }
                    console.log("infoWindowContent: ", infoWindowContent);
                    infowindow.setContent(infoWindowContent);
            });*/
            //}
            this.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout((function() {
                this.setAnimation();
            }).bind(this), 2000);
    };

    //Launch application map
    this.showMap();
    //Search markers and update map based on search result
    this.searchLocation = ko.computed(function() {
        var finalResult = [];
        for (var k = 0; k < this.m_markers.length; k++) {
            var locations = this.m_markers[k];
            if (locations.title.toLowerCase().includes(this.searchResults().toLowerCase())) {
                finalResult.push(locations);
                this.m_markers[k].setVisible(true);
            } else {
                this.m_markers[k].setVisible(false);
            }
        }
        return finalResult;
    }, this);
}
 /**
    * @description Error handling for Google maps
*/
function googleError(){
    alert("Error loading google maps");
}

//Knockout binding
function initMap() {
    ko.applyBindings(new AppViewModel());
}