$(document).ready(function() {
	$("#frametoggle").hide();
	loadLatestTweet();			
});
		
var temp_link = "";
var nameframe = "myframe";
		
function loadLatestTweet(){
	var _url = 'getTweet.php';
	$.getJSON(_url,function(data){
		for(var i = 0; i< data.length; i++){
			var tweet = data[i].text;
			var created = parseDate(data[i].created_at);
			var createdDate = created.getDate()+'-'+(created.getMonth()+1)+'-'+created.getFullYear()+' at '+created.getHours()+':'+created.getMinutes();
			tweet = tweet.parseURL().parseUsername().parseHashtag();
			$("#twitter-feed").append('<blockquote class="twitter-tweet"><p>'+tweet+'</p>&mdash; The Oregonian (@Oregonian) <a href="https://twitter.com/Oregonian/statuses/'+data[i].id_str+'" target="_blank">'+createdDate+'</a></blockquote>');
		}
		/* 
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "http://platform.twitter.com/widgets.js";
		$("body").append(s);
		*/	
		toggleframe();
	});
}		
		
//Twitter Parsers
String.prototype.parseURL = function() {
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function(url) {
		return '<a onclick="assignlink(\''+ url +'\');" href=' + url + " target=" + nameframe + ">" + url + "</a>";
	});
};
String.prototype.parseUsername = function() {
	return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
		var username = u.replace("@","");
		var realurl = "https://twitter.com/" + username;
		return '<a onclick="assignlink(\''+ realurl +'\');" href=' + realurl + " target=" + nameframe + ">" + u + "</a>";
	});
};
String.prototype.parseHashtag = function() {
	return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
		var tag = t.replace("#","%23");
		var realurl = "https://twitter.com/search?q=" + tag
		return '<a onclick="assignlink(\''+ realurl +'\');" href=' + realurl + " target=" + nameframe + ">" + t + "</a>";		
	});
};

function parseDate(str) {
	var v=str.split(' ');
	return new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));
}
		
function assignlink(url){
	temp_link = url;
}
	
function toggleframe(){
	$("a").click(function(){
		$("#frametoggle").show();
	})
}
		
function closeframe(){
	$("#urlframe").attr("src","about:blank");
	$("#frametoggle").hide();
} 
		
function bookmarkController($scope){
	$scope.bookmarklinks = [];
	var idnum =0;
			
	$scope.add = function() {
		$scope.bookmarklinks.push({id:idnum++, url:temp_link});
		temp_link = "";
		closeframe();
	}
	
	$scope.remove=function(removeLink){ 
		var index=$scope.bookmarklinks.indexOf(removeLink);
		$scope.bookmarklinks.splice(index,1);     
	}
}	
