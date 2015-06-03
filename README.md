# Cubie

## The little front-end companion

Cubie is an HTML5 starter kit that includes: package and task management, local server with browser synchronization, beautiful auto-generated documentation, styles pre-processor, files minification and images optimisation.

## A collection of tools

* [Gulp](http://gulpjs.com/)
* [Bower](http://bower.io/)
* [HTML5 Boilerplate](https://html5boilerplate.com/)
* [LibSass](http://libsass.org/)
* [Susy](http://susy.oddbird.net/)
* [Breakpoint Sass](http://breakpoint-sass.com)
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Hologram](http://trulia.github.io/hologram/)
* [BrowserSync](http://www.browsersync.io/)

## Requirements

You'll need to have the following items installed before continuing.

  * [Ruby](https://www.ruby-lang.org/en/documentation/installation/): Use the installer provided on the website.
  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Gulp](http://gruntjs.com/): Run `[sudo] npm install --global gulp`

## Quickstart

Open you terminal, go to the folder: `cd [your_path]/frontend-cubie/`
And then install the dependencies:

```
npm install
bower install
```

While you're working on your project, run:

`gulp` to generate the pages

And you're set!


## Directory Structure

* `src/`: The sources
* `src/index.html`: The content of the homepage
* `src/assets`: Images, fonts, icons...
* `src/scripts`: Javascripts
* `src/styles`: SASS files

* `app/`: The generated pages (overwritten overtime your run gulp)
* `app/styleguide`: The auto-generated documentation


## How to add an icon?

* Start by creating or choosing a vector icon from the [Entypo library](http://www.entypo.com/)
* Add the SVG-formatted icon in `src/assets/icons/`
* Link your icon in the html:

```
<svg class="icon-{name_of_you_icon}"><use xlink:href="#icon-{name_of_you_icon}"></use></svg>
```

* Run `gulp` again

##TODO

* [x] Base grid system?
* [x] HTML mininfied
* [x] Images optimization
* [x] SVG Icons 
* [X] Add ModernizR
* [ ] Create a Yeoman package generator
* [ ] Template system (assemble? handlebars?)
* [ ] Browser caching (filerev?)
* [ ] Tests (karma?)
* [ ] Better documentation

## Author

Cubie was made by [Pierre Fritsch](https://github.com/pfritsch) for [We Are Cube.³](https://github.com/wearecube).

## License

Front-end Cubie is licensed under the Apache 2.0 License
