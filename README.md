# Bedrock

Welcome to Bedrock.

<img src="http://f.cl.ly/items/413y2M3N1w231a3o3X09/bedrock-icon.png" width="250">

Bedrock is a static site generator to easily make HTML prototypes.

## Features

* Automatic index of pages
* Style guide that gets generated from a set of files
* Automatic color documentation based on SCSS file
* Icon font compilation

## Choices

* Jade as a template language
* Freedom of SCSS framework

## Installation and usage

* First, make sure you have Node installed
* Install the project's dependencies: `npm install`
* To run the prototype: `gulp`. All files are automatically compiled before they are served.

## Running specific Gulp tasks

This project uses an npm script to trigger Gulp. To run a specific Gulp task, run `npm TASK_NAME`.

## Deploying the prototype

Before deploying the prototype to a remote server, make sure you run `gulp build` to generate the required CSS, HTML, JS and fonts.

## Icon font compilation

### Installing dependencies

* OSX: `brew install fontforge eot-utils` and `gem install fontcustom`
* Linux/Windows: to be investigated!

### Compiling the font

To compile the icon font based on the SVG icons, run `gulp icon-font`.

## License

Bedrock is MIT licensed.

## Credits

Bedrock was made by the team at <a href="http://mono.company">Mono</a>.