<?php 
$body = file_get_contents( 'https://victraffic-api.wd.com.au/api/v3/incidents' );
echo $body;
?>