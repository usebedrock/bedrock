# Bedrock 1.0.0alpha

Welcome to Bedrock.

<img src="http://cl.ly/image/0P431F2v341t/flintstones-the-flintstones-7558485-302-225.jpg">

Bedrock is a static site generator to easily make HTML prototypes.

## Features

* Automatic index of pages
* Style guide that gets generated from a set of files
* Automatic color documentation based on SCSS file
* Icon font compilation

## Choices

* Jade as a template language
* Freedom of SCSS framework, but we are supposing you are starting from Bootstrap, Foundation or your own framework

## Installation and usage

* First, make sure you have Node installed
* Install the project's dependencies: `$ npm install`
* To run the prototype: `$ npm start`. All files are automatically compiled before they are served.

*If you are running `tmux`, be sure to follow [these instructions](https://github.com/julienXX/terminal-notifier/issues/115#issuecomment-104214742)
to enable notification errors, or the build system will hang.*

## Running specific Gulp tasks

This project uses an npm script to trigger Gulp. To run a specific Gulp task, run `$ npm run gulp TASK_NAME`.

## Deploying the prototype

Before deploying the prototype to a remote server, make sure you run `$ npm run build` to generate the required CSS,
HTML, JS and fonts.

## Icon font compilation

### Installing dependencies

* OSX: `$ brew install fontforge eot-utils` and `$ gem install fontcustom`
* Linux/Windows: to be investigated!

### Compiling the font

To compile the icon font based on the SVG icons, run `$ npm run icon-font`.

## License

Bedrock is MIT licensed.

## Credits

Bedrock was made by the team at <a href="http://mono.company">Mono</a>.