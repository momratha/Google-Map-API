$(document).ready(
    function () {

       
        var config_obj = {
            url: "js/config.js",
            cache: false,
            dataType: 'script',
            success: bootstrap,
            error: setError
        };
        ajaxCore(config_obj);

       

        // start map bootstrap logic
        function bootstrap() { 
            var google_api_key = initConfig.google_api_key;
            if (google_api_key == "") {
                var msg = "Please insert your google_api_key in config.js. Otherwise the Map will not working properly";
                alert(msg);
                console.error(msg);
                return false;
            }
            var data_obj = {
                url: initConfig.jsonURL,
                cache: false,
                dataType: 'text',
                success: getGoogleMap,
                error: setError
            };
            var google_map_obj = {
                url: initConfig.google_api_url + initConfig.google_api_key,
                dataType: "script",
                success: GoogleMapObj.initMap,
                error: setError
            };
            // get data then get the google map
            $('html,body').css('cursor', 'wait');
            ajaxCore(data_obj);
            //call back function when data return from  ajax
            function getGoogleMap(data) {
                $('html,body').css('cursor', 'default');
                $("#data").val(data);
                ajaxCore(google_map_obj);
            }
            
            //setup the list button on click
            var btnID = initConfig.btnID;
            var divList = initConfig.divList;
            $("#" + btnID).click(function() {
                $("#" + divList).toggleClass("setListHeight");
            }); 
        }
        //make the code more format and easy to read
        function ajaxCore(obj) {
            if (typeof (obj) != "undefined") {
                $.ajax(obj);
            }
        }
        function setError(xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
            $("#map").html("Sorry, we're having some technical issues - Please try again.")
        }
    }
);
