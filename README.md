# ![Bedrock](https://bedrockapp.org/wp-content/themes/bedrock/images/logo-black.svg)

Welcome to Bedrock.

![Bedrock Release](https://img.shields.io/github/release/usebedrock/bedrock.svg)

Bedrock is a powerful tool that lets you prototype complex web applications and document design systems.

For the full documentation, please check out [the Bedrock website](https://bedrockapp.org/).

## Basic installation & first run

* First, make sure you have Node 8.3 or later installed. You can find the latest version of Node at [Nodejs.org](https://nodejs.org/en/).
* You need to have `gulp` installed globally to use Bedrock. `npm install -g gulp`.
* Install the project's dependencies:
  * `npm install`
* Run `gulp` to start your project.

## Major commands

* `gulp`: runs the prototype
* `gulp build`: create a build (which ends up in the `dist` folder) that can be deployed to a server

## Upgrading bedrock

See the README at https://github.com/mono-company/bedrock-cli .

## Using icon fonts

* If you want to use icon fonts you need more dependencies than just node. Icon font generation is optional. Set `icons.generateIconFont` to `true` in `bedrock.config.js` to activate icon fonts.
* In order for the icon font generation to work, install the required gems using `bundle install`. You will need [Bundler](http://bundler.io) for this. We depend on a Ruby gem called `fontcustom`. Bundler will install the required dependencies.
    * You will also need to install fontforge using [brew](http://brew.sh). For download instructions see the [fontcustom](https://github.com/FontCustom/fontcustom#installation) repo.

## Windows

Windows usage is not supported at the moment.

We have used Bedrock on Windows successfully though. If you encounter any Windows related bugs, please log them under issues.

## License

Bedrock is MIT licensed.

## Credits

Bedrock was made by the team at [Mono](http://mono.company) with most major contributions by [Thomas Tuts](http://thomastuts.com/).
