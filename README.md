# Digital Underground Wordpress Theme
---

This theme is the dev version of the theme. To make an awesome version of it. 

Do a `npm install`

then

Please run two gulp tasks.

`gulp sass` and then `gulp copy`

This should copy all the needed files into a new directory, make sure this one is called different. like dev-digital0underground.

finally you'll need to make sure there is a style.css in the other theme. Just quickly make this to make sure that wordpress recognises it, manually make and add it to the production version of the theme, otherwise wordpress will recognise the dev version (we don't want that).

## When developing

When you want to do any dev work on this. Make sure you run `gulp watch` it will then move any files, compile sass. etc. it will then all be spit out into the new digital-underground theme. Have wordpress, load this theme. Then it's just like making any other theme.

## Theme Dependancies

For the theme to work, please make sure that the following plugins are installed.

- Timber
- CPT UI
- ACF (Advanced Custom Fields)

## Database shiz
---

### Needed posttype

By using CPT UI, make a custom posttype called student.

These labels

post-type-slug: student
plural label: students
singular label: Student

These settings

settings -> supports

- title
- editor
- featured image

settings -> Built-in Taxonomies

- categories

### Custom Fields

make a field group called students

only show if post type is equal to student

then make sure you have the following fields

- Portfolio Url (portfolio_url) (text)
- Project Name (project_name) (text) *
- Project Url (project_url) (text)
- Project Description (project_description) (textarea) *


