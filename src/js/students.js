(function($){



/* Logic for the modal and didatic */

var modal = $('.modal');
var modalContent = $('.modal-content');
var projectTitle = $('.project-title');
var urlBtn = $('.js-urlBtn');
var overlay = $('.overlay');

var prevCat;

overlay.on('click', function(e){
	if (modal.hasClass('open')) {
		modal.removeClass('open');
		modal.removeClass(prevCat);
		urlBtn.removeClass('has-url');
		$('body').css('overflow','auto');

	}
});

function attachListeners(el) {
    el.on('click', function(e){
        e.preventDefault();

        var didactic = $(this).attr('data-didactic');
        var title = $(this).attr('data-title');
        var url = $(this).attr('data-url');
        var categoryClass = $(this).attr('data-category');

        modal.addClass('open');
        $('body').css('overflow','hidden');
        modalContent.html(didactic);
        projectTitle.html(title);

        if (categoryClass) {
            modal.addClass(categoryClass);
            prevCat = categoryClass;
        }

        if (url) {
            urlBtn.attr('href', 'http://' + url);
            urlBtn.addClass('has-url');
        }
    });
}

attachListeners($('.js-button'));

if ( window.addEventListener ) {
        var kkeys = [], konami = "77,65,84,84"; //this spells dinner
        window.addEventListener("keydown", function(e){
                kkeys.push( e.keyCode );
                if ( kkeys.toString().indexOf( konami ) >= 0 ) {
                    // run code here    
                    $('.graduate-wrapper img').attr("src","http://digitalunderground.co/wp-content/themes/digital-underground/assets/secrets.png");
                }
        }, true);
}

})(jQuery);