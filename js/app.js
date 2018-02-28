/*
Map markers
*/
const mumbaiMark = [18.972711, 72.804394];
let mumbaiMarkers = [
  ['Gateway of India', 18.921984, 72.834654],
  ['ChurchGate', 18.935323, 72.827159],
  ['Bandra Worli Sea Link', 19.030149, 72.81561],
  ['Sanjay Gandhi National Park', 19.221035, 72.906792 ],
  ['Breach Candy Hospital', 18.972711, 72.804394],
  ['The Oberoi Hotel', 18.926975, 72.820452],
  ['Horniman Circle', 18.931832, 72.836156],
  ['Nehru Planetorium', 18.990059, 72.814797],
  ['Chhatrapati Shivaji Terminus Area', 18.94487, 72.833672],
  //['Juhu Beach', 19.096903, 72.826565],
  ['Metro Inox Cinema', 18.943013, 72.828878]
];

const timeout = 3000;
var marker, i;
function mapMarker(){

 var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(mumbaiMark[0], mumbaiMark[1]),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    for (i = 0; i < mumbaiMarkers.length; i++) {
      	marker = new google.maps.Marker({
        position: new google.maps.LatLng(mumbaiMarkers[i][1], mumbaiMarkers[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent('Location:' + mumbaiMarkers[i][0] + '<br>Latitude: ' + mumbaiMarkers[i][1] +
    '<br>Longitude: ' + mumbaiMarkers[i][2]);
          marker.setAnimation(google.maps.Animation.BOUNCE);
          infowindow.open(map, marker);
          window.setTimeout(function() {
         	marker.setAnimation();
        }, timeout);
        }
      })(marker, i));
    }
}

function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('searchLocation');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}