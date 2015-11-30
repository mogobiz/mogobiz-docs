$(document).ready(function(){
	twitterFetcher.fetch({
		"id": '671277550388293632',
		"dataOnly": true,
		"customCallback": tpl,
		"maxTweets": 2,
		"showImages": false
	});
	function tpl(tweets){
		var html = "<div class='RalewaySemiBold size13 top-small-space'>";
		for (var i = 0; i < tweets.length ; i++) {
			html += "<div class='RalewaySemiBold size13 top-small-space'>" + tweets[i].tweet + "</div>"
		}
		$("#recent_tweets").html(html);
	}
});