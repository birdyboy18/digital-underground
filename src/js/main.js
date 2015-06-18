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
var Handlebars = require('handlebars');

Handlebars.registerHelper('html_decoder', function(text) {
  var str = unescape(text).replace(/&amp;/g, '&');

  var div = document.createElement('div');
  div.innerHTML = str;
  return div.firstChild.nodeValue; 
});

var graduatesSource = $('#graduates').html();
var template = Handlebars.compile(graduatesSource);

var base = 'http://' + window.location.host + '/wp-json/';

var Data = {
	graduates: []
};

request
.get(base + 'posts')
.query({ 'type': 'student'})
.query({ 'page': '0' })
.query({ 'filter[posts_per_page]': '12'})
.query({ 'filter[orderby]': 'rand'})
.set('Content-Type', 'application/json')
.end(function(err,res){
	if (res.ok) {
		res.body.map(function(data){
			Data.graduates.push({
				title: data.title,
				status: data.status,
				content: data.content,
				project_name: data.acf.project_name,
				project_description: data.acf.project_description,
				portfolio_url: data.acf.portfolio_url,
				project_url: data.acf.project_url,
				thumbnail: data.featured_image.source,
				categories: data.terms.category
			});
		});
		//now we've got all the graduates and pushed them into an array, lets render them
		var rendered = template(Data);
		
		$('#graduates').html(rendered);
	}
});




})(jQuery);