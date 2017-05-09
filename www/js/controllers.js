angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $compile) {
  $scope.initialize = function() {

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      console.log(lat);
      console.log(long);
      var myLatlng = new google.maps.LatLng(lat,long);
      addMarker(myLatlng, map);
      // google.maps.event.addListener(marker, 'click', function() {
      //   infowindow.open(map,marker);
      // });
    }, function(err) {
      throw err;
    });

    // gsis lat long 
    //var myLatlng = new google.maps.LatLng(43.083848,-77.6799);
    
    var mapOptions = {
      center: {lat: 43.083848, lng: -77.6799},
      //center: myLatlng,
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    // google.maps.event.addListener(map, 'click', function(event) {
    //       addMarker(event.latLng, map);
    //     });

    // Adds a marker to the map.
    function addMarker(location, map) {
      // Add the marker at the clicked location, and add the next-available label
      // from the array of alphabetical characters.
      var marker = new google.maps.Marker({
        position: location,
        label: "Your location",
        map: map
      });
    }

    // var marker = new google.maps.Marker({
    //   position: {lat: 43.083848, lng: -77.6799},
    //   map: map,
    //   title: 'Womens bathroom'
    // });

    $scope.map = map;
  }
  
})

.controller('BathroomsCtrl', function($scope, $cordovaSQLite) {
  $scope.items = [];
  $scope.bathrooms = [
    {
      name: 'GCCIS Bathroom 1',
      items: [],
      input: '',
    },
    { 
      name: 'GCCIS Bathroom 2',
      items: [],
      input: '',
    },
    {
      name: 'GCCIS Bathroom 3',
      items: [],
      input: '',
    }
  ];

  $scope.insert = function(bathroom) {
    var query = "INSERT INTO bathroomcomment (comment, bathroom) VALUES (?, ?)";
    $cordovaSQLite.execute($scope.db,query,[bathroom.input, bathroom.name]).then(function(result) {
      console.log("user input: " + bathroom.input);
      $scope.reloadComments();
    }, function(error) {
      console.error(error);
    });
  };


  $scope.reloadComments = function() {
    var query = "SELECT * FROM bathroomcomment";
    $scope.items.length = 0;  // clear out the array
    $cordovaSQLite.execute($scope.db,query,[]).then(function(result) {
      for (i = 0; i < $scope.bathrooms.length; i++) {
        $scope.bathrooms[i].items = [];
      }
      if (result.rows.length > 0) {
        for (i = 0; i < result.rows.length; i++){
          var row = result.rows.item(i);
          $scope.bathrooms.find(function (b) { return b.name === row.bathroom }).items.push({
            comment: row.comment,
          });
        }
       
      } else {
        console.log("NO ROWS EXIST");
      }
    }, function(error) {
      console.error(error);
    });
  };

  $scope.reloadComments();
});
