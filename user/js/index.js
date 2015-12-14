$(document).ready(function(){
	$("#toTop").scrollToTop({
		"speed" : 300,
		"offset": 80
	});
	$(".leftMenu .collapsible").bind("click", function(){
		$(this).parent().toggleClass("expanded").toggleClass("collapsed");
	});

	var location = window.location.href;
	var baseUrl = $("#baseUrl").val();
	location = location.substring(location.indexOf(baseUrl) + baseUrl.length + 1, location.length - 1);
	var tab = location.split("/");
	if(tab.length > 0){
		var tempTab = [];
		for(var i = 0; i < tab.length; i++){
			tempTab[tempTab.length] = tab[i];
			var id = i == 0 ? tab[0] : tempTab.join("-");
			if(i == tab.length - 1){
				$("#" + id).parent().addClass("active");
			}
			else{
				$($("#" + id).parent().find("a.collapsible")[0]).click();
			}
		}
	}
});