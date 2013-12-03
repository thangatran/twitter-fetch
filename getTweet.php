<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "2174912659-njZXvvpyxIyaX5zIunqAc6Ck5r5k0FFxLVYJxOC",
    'oauth_access_token_secret' => "G5HDMe9pwoZEqZOBg6zKBrAhYfcBZGpmqfjjrQitPRgNH",
    'consumer_key' => "K0pK7dWMuDaYSTkQTtDsg",
    'consumer_secret' => "o8ssp1wb338D0k17yVbZCw25VNGIissIU3lpUQY8P1I"
);

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?screen_name=Oregonian&count=7';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
?>
