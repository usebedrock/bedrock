# Bedrock

Welcome to Bedrock.

<img src="http://f.cl.ly/items/413y2M3N1w231a3o3X09/bedrock-icon.png" width="250">

Bedrock is a static site generator to easily make HTML prototypes. For more information, please check out <a href="http://bedrock.mono.company/">the Bedrock homepage</a>.

## Installation and usage

* First, make sure you have Node 4.2.1 installed. You can find the latest version of Node at <a href="https://nodejs.org/en/">NodeJS.org</a>.
* Then, make sure you have root access to your machine. You will need it to install a ruby gem to create icon fonts called `fontcustom`
* You need to have `gulp` installed globally to use Bedrock. `npm install -g gulp`.
* Install the project's dependencies:
  * `npm install`
  * `gem install fontcustom`
    * You might also need to install fontforge. For download instructions see the <a href="https://github.com/fontforge/fontforge">Fontforge</a> repo.
* To run the prototype: `gulp`. All files are automatically compiled before they are served.

## Available gulp tasks

* `gulp`: runs the prototype
* `gulp icon-font`: manually run the icon font
* `gulp modernizr`: create a custom Modernizr file using the feature specified in the configuration
* `gulp build`: create a build (which ends up in the `dist` folder) that can be deployed to a server

## Configuration

The configuration lives in `core/config.js`. Available options are:

* styleguide
  * snippetLanguage
    * This influences the snippets shown in the styleguide. 
    * `jade` or `html`
  * colors
    * path to CSS file specifying colors
* patternClasses
  * which patterns should get extra CSS classes
  * this is useful for customizing the styleguide while keeping your main CSS file clean e.g. to show elements that are hidden by default
  * specify the pattern as a string and 1 or more classes as an array
* modernizr
  * minify (boolean)
    * whether modernizr output should be minified 
  * feature-detects (array)
    * which feature detects should be included when building a custom version of modernizr

## Windows

Windows usage is not supported at the moment.

## License

Bedrock is MIT licensed.

## Credits

Bedrock was made by the team at <a href="http://mono.company">Mono</a>.
