angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
  $scope.initialize = function() {
    var myLatlng = new google.maps.LatLng(43.083848,-77.6799);
    
    var mapOptions = {
      center: {lat: 43.083848, lng: -77.6799},
      //center: myLatlng,
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    google.maps.event.addListener(map, 'click', function(event) {
          addMarker(event.latLng, map);
        });

    // Adds a marker to the map.
    function addMarker(location, map) {
      // Add the marker at the clicked location, and add the next-available label
      // from the array of alphabetical characters.
      var marker = new google.maps.Marker({
        position: location,
        label: "Bathroom",
        map: map
      });
    }

    // var marker = new google.maps.Marker({
    //   position: {lat: 43.083848, lng: -77.6799},
    //   map: map,
    //   title: 'Womens bathroom'
    // });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('BathroomsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
