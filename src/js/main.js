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

overlay.on('click', function(e){
	if (modal.hasClass('open')) {
		modal.removeClass('open');
		modal.removeClass(prevCat);
		urlBtn.removeClass('has-url');
		$('body').css('overflow','auto');

	}
});

/* Logic for fetching and rendering using the wp-api */

//Global variables / includes
var request = require('superagent');
var Handlebars = require('handlebars');

var graduatesSource = $('#graduates-template').html();
var template = Handlebars.compile(graduatesSource);

//query config
var config = {
	'posts_per_page': 6
}
var currentPage = 0;
var skip = currentPage*config.posts_per_page;

var graduates;

//Okay lets render some students

getResults(function(data){
	graduates = data;
	paginate(graduates, skip, config.posts_per_page, function(results){
		console.log(currentPage);
		console.log(results);
		renderTemplate(template, results, function(html){
			$('#graduates').html(html);
			attachListeners($('.js-button'));
		});
	});
});

$('.js-next').on('click', function(e){
	e.preventDefault();
	checkCurrentPage('increment');


	paginate(graduates, skip, config.posts_per_page, function(results){
		renderTemplate(template, results, function(html){
			$('#graduates').html(html);
			attachListeners($('.js-button'));
		})
	})
});

$('.js-prev').on('click', function(e){
	e.preventDefault();
	checkCurrentPage('decrement');

	paginate(graduates, skip, config.posts_per_page, function(results){
		renderTemplate(template, results, function(html){
			$('#graduates').html(html);
			attachListeners($('.js-button'));
		});
	});
});

/*
* Fetch the students from the wp-api, allows you to specify a page.
* Provides a callback with all the results so you can use them.
*/
function getResults(cb) {
	var base = 'http://' + window.location.host + '/wp-json/';

	var Data = {
		graduates: []
	};

	request
	.get(base + 'posts')
	.query({ 'type': 'student'})
	.query({ 'filter[posts_per_page]': '-1'})
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
			cb(Data);
		}
	});
}

/*
* Use this to render, any kind of data into any handlebars template
* this provides a callback with the fully rendered html, that way we know it's definately done.
*/
function renderTemplate(template, data, cb) {
	var rendered = template(data);
	cb(rendered);
}

/*
* Used to attach event listeners to the buttons after they've been rendered.
*/
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

function paginate(data, skip, posts_per_page, cb) {
	//loop through graduates
	var results = {};
	var total = data.graduates.length;
	
	var i = skip;
	var limit = skip + posts_per_page;

	if (limit > total) {
		results.graduates = data.graduates.slice(skip,total);
	} else {
		results.graduates = data.graduates.slice(skip,limit);
	}
	
	cb(results);

	//limit = skip + posts_per_page;
	//skip = currentPage * posts_per_page;
}

function checkCurrentPage(option) {
	maxPage = (graduates.graduates.length/config.posts_per_page) - 1;

	if (option == 'increment') {
		if (currentPage < maxPage) {
			currentPage++;
			skip = currentPage*config.posts_per_page;
			console.log(currentPage);
		}
	}

	if (option == 'decrement') {
		if (currentPage > 0) {
			currentPage--;
			skip = currentPage*config.posts_per_page;
			console.log(currentPage);
		}
	}
}




})(jQuery);