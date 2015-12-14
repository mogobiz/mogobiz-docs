(function($) {
    $.fn.scrollToTop = function(options) {
        var config = {
            "speed" : 800,
			"offset": 100
        };

        if (options) {
            $.extend(config, {
                "speed" : options.speed,
                "offset" : options.offset
            });
        }

        return this.each(function() {

            var $this = $(this);

            $(window).scroll(function() {
                if ($(this).scrollTop() > config.offset) {
                    $this.fadeIn();
                } else {
                    $this.fadeOut();
                }
            });

            $this.click(function(e) {
                e.preventDefault();
                $("body, html").animate({
                    scrollTop : 0
                }, config.speed);
            });

        });
    };
})(jQuery);
