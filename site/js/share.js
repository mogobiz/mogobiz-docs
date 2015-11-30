$(document).ready(function(){
	var includes = $(".includePage")
	for(var i = 0; i < includes.length; i++)
		$(includes[i]).load($(includes[i]).attr("src"));
});