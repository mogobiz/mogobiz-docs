var disqus_shortname = 'a7madibrahim';

$(document).ready(function(){
	$(".rightCol .listBox .tabs td").bind("click", function(){
		$(".rightCol .listBox .tabs td").removeClass("active").addClass("inactive");
		$(this).removeClass("inactive").addClass("active");
		switch($(this).attr("id")){
			case "recentTab":
				$(".rightCol .listBox .popular").hide();
				$(".rightCol .listBox .comments").hide();
				$(".rightCol .listBox .recent").show();
				break;
			case "popularTab":
				$(".rightCol .listBox .recent").hide();
				$(".rightCol .listBox .comments").hide();
				$(".rightCol .listBox .popular").show();
				break;
			case "commentsTab":
				$(".rightCol .listBox .recent").hide();
				$(".rightCol .listBox .popular").hide();
				$(".rightCol .listBox .comments").show();
				break;
			default:
				break;
		}
	});
	updatePostTime();
	setInterval(updatePostTime, 60000);
	addTwitter();
	if($("#disqus_thread")[0])
		configureDisqus();
});

function addTwitter(){
	var js;
	var fjs = document.getElementsByTagName('script')[0];
	var p = /^http:/.test(document.location) ? 'http' : 'https';
	if(!document.getElementById('twitter-wjs')){
		js = document.createElement('script');
		js.id = 'twitter-wjs';
		js.src = p + '://platform.twitter.com/widgets.js';
		fjs.parentNode.insertBefore(js,fjs);
	}
}

function configureDisqus(){
	var dsq = document.createElement('script');
	dsq.type = 'text/javascript';
	dsq.async = true;
	dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
}

function updatePostTime(){
	var times = $(".postDate");
	for(var i = 0; i < times.length; i++){
		var time = new Date($(times[i]).html()).getTime();
		$(times[i]).parent().find(".postTime").html(findPostTime(time));
	}
}

function findPostTime(time){
	var diff = (new Date().getTime() - time) / 1000;

	var days = Math.floor((diff % 31536000) / 86400); 
	if(days > 5){
		return dateToString(new Date(time));
	}

	if(days > 0){
		if(days == 1)
			return "1 day ago";
		else
			return days + " days ago";
	}

	var hours = Math.floor(((diff % 31536000) % 86400) / 3600);
	if(hours > 0){
		if(hours == 1)
			return "1 hour ago";
		else
			return hours + " hours ago";
	}

	var minutes = Math.floor((((diff % 31536000) % 86400) % 3600) / 60);
	if(minutes > 0){
		if(minutes == 1)
			return "1 minute ago";
		else
			return minutes + " minutes ago";
	}
	return "1 minute ago";
}

function dateToString(date){
    var dateString = "";
    if(date){
        var day = ""+(parseInt(date.getDate()));
        if(day.length == 1)
            dateString += "0"+day;
        else
            dateString += day;
        var month = ""+(parseInt(date.getMonth())+1);
        if(month.length == 1)
            dateString += "/0"+month;
        else
            dateString += "/"+month;
        dateString += "/"+date.getFullYear();
    }
    return dateString;
}