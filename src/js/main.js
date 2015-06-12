(function($){

var redline = document.getElementsByClassName('redline-path')[0];
var turqline = document.getElementsByClassName('turqline-path')[0];
var yellowline = document.getElementsByClassName('yellowline-path')[0];
var orangeline = document.getElementsByClassName('orangeline-path')[0];
var greenline = document.getElementsByClassName('greenline-path')[0];

redline.classList.add('draw');
turqline.classList.add('draw');
yellowline.classList.add('draw');
orangeline.classList.add('draw');
greenline.classList.add('draw');

/* Logic for the modal and didatic */

var aboutBtn = $('.js-button');
var modal = $('.modal');
var modalContent = $('.modal-content');
var projectTitle = $('.project-title');
var urlBtn = $('.js-urlBtn');
var overlay = $('.overlay');

var prevCat;

aboutBtn.on('click', function(e){
	e.preventDefault();

	var didactic = $(this).attr('data-didactic');
	var title = $(this).attr('data-title');
	var url = $(this).attr('data-url');
	var categoryClass = $(this).attr('data-category');

	modal.addClass('open');
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

overlay.on('click', function(e){
	if (modal.hasClass('open')) {
		modal.removeClass('open');
		modal.removeClass(prevCat);
		urlBtn.removeClass('has-url');
	}
});

//trying out the wp-api

var request = require('superagent');

var base = 'http://' + window.location.host + '/wp-json/';

request
.get(base + 'posts')
.query({ 'type': 'student'})
.query({ 'page': '3' })
.query({ 'filter[posts_per_page]': '1'})
.set('Content-Type', 'application/json')
.end(function(err,res){
	if (res.ok) {
		console.log(res.body);
	}
})


})(jQuery);