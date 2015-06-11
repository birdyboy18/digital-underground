<?php 

$context = Timber::get_context();

$context['page'] = Timber::get_post();
$args = array(
	'post_type' => 'student',
	'post_status' => 'publish',
	'posts_per_page' => '-1'
);
$context['students'] = Timber::get_posts($args);

Timber::render('front-page.twig', $context);
 ?>