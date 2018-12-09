var GoogleMapObj = {

  initMap: function () {
    var initData = initConfig.initData;


    map = new google.maps.Map(document.getElementById(initData.appendToID), {
      zoom: initData.zoom,
      center: new google.maps.LatLng(initData.lat, initData.lng),
      mapTypeId: initData.mapTypeId
    });

    // Create markers.
    var json_data = GoogleMapObj._getMapData();
    var markers = [];

    if (typeof (json_data.incidents) != "undefined") {

      var btnID = initConfig.btnID; $("#" + btnID).val("LIST (" + json_data.incidents.length + ")");

      if (json_data.incidents.length > 0) {

        // one loop do all save browsers memory and cpu
        json_data.incidents.forEach(function (element, index) {
          //  setTimeout(function() {
          // console.log(element);
          var infowindow = GoogleMapObj._createInfoWindow(element);
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(element.lat, element.long),

            animation: google.maps.Animation.DROP,
            map: map,
            title: 'Traffic Map',
            visible: true,
          });
          marker.addListener('click', function (event) {
            infowindow.open(map, marker);

          });
          markers.push(marker); // save all markers
          //  }, index * 10 );
        });
        /* Change markers on zoom */
        var objset = {
          Map: map,
          Markers: markers,
          Incidents: json_data.incidents
        }
        google.maps.event.addListener(map, 'zoom_changed', function () {
          GoogleMapObj._addToList(objset);
        });
        google.maps.event.addListener(map, 'drag', function () {
          GoogleMapObj._addToList(objset);
        });
      }
    }

  },
  _getMapData: function () {
    var json_data_id =  initConfig.DataID;
    var mapStr = $("#" + json_data_id).val();
    if (typeof (mapStr) == "string") {
      return JSON.parse(mapStr);
    }
  },
  _createInfoWindow: function (incident) {
    var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">' + incident.title + ' - ' + incident.closure_type + '</h1>' +
      '<div id="bodyContent">' +
      '<p>' + incident.closed_road_name +
      'sandstone rock formation in the southern part of the ' +
      incident.description + '</p>' +
      '</div>' +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    return infowindow;
  },
  _addToList: function (objset) {
    var listID = initConfig.listID;
    var btnID = initConfig.btnID;

    $("#" + listID).html("");
    var j = 0;
    for (i = 0; i < objset.Markers.length; i++) {
      if (objset.Map.getBounds().contains(objset.Markers[i].getPosition())) {
        j++;
        $("#" + listID).append("<li><b>" + objset.Incidents[i].title + '</b> - ' + objset.Incidents[i].closure_type + "</li>");
      }
    }
    $("#" + btnID).val("LIST (" + j + ")");
  }
};

