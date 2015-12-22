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

* First, make sure you have Node 4.2.1 installed. You can find the latest version of Node at <a href="https://nodejs.org/en/">NodeJS.org</a>.
* Then, make sure you have root access to your machine. You will need it to install a ruby gem to create icon fonts called `fontcustom`,
* Install the project's dependencies:
  * `npm install`
  * `gem install fontcustom`
* To run the prototype: `gulp`. All files are automatically compiled before they are served.

## Running specific Gulp tasks

This project uses an npm script to trigger Gulp. To run a specific Gulp task, run `npm TASK_NAME`.

## Deploying the prototype

Before deploying the prototype to a remote server, make sure you run `gulp build` to generate the required CSS, HTML, JS and fonts.

## Windows

Windows usage is not supported at the moment.

## License

Bedrock is MIT licensed.

## Credits

Bedrock was made by the team at <a href="http://mono.company">Mono</a>.