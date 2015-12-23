# Bedrock

Welcome to Bedrock.

<img src="http://f.cl.ly/items/413y2M3N1w231a3o3X09/bedrock-icon.png" width="250">

Bedrock is a static site generator to easily make HTML prototypes. For more information, please check out <a href="http://bedrock.mono.company/">the Bedrock homepage</a>.

## Installation and usage

* First, make sure you have Node 4.2.1 installed. You can find the latest version of Node at <a href="https://nodejs.org/en/">NodeJS.org</a>.
* Then, make sure you have root access to your machine. You will need it to install a ruby gem to create icon fonts called `fontcustom`,
* Install the project's dependencies:
  * `npm install`
  * `gem install fontcustom`
* To run the prototype: `gulp`. All files are automatically compiled before they are served.

## Available gulp tasks

* `gulp`: runs the prototype
* `gulp icon-font`: manually run the icon font
* `gulp build`: create a build (which ends up in the `dist` folder) that can be deployed to a server

## Windows

Windows usage is not supported at the moment.

## License

Bedrock is MIT licensed.

## Credits

Bedrock was made by the team at <a href="http://mono.company">Mono</a>.