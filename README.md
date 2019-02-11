# ![Bedrock](https://bedrockapp.org/wp-content/themes/bedrock/images/logo-black.svg)

Welcome to Bedrock.

![Bedrock Release](https://img.shields.io/github/release/usebedrock/bedrock.svg)

Bedrock is a powerful tool that lets you prototype complex web applications and document design systems.

For the full documentation, please check out [the Bedrock website](https://bedrockapp.org/).

## Basic requirements

* First, make sure you have Node 10 or later installed. You can find the latest version of Node at [Nodejs.org](https://nodejs.org/en/). Go for the LTS version.

## Using Bedrock to make prototypes

## Create your first prototype

We recommend using <a href="https://github.com/Rich-Harris/degit">degit</a> to be able to grab a Bedrock install without actually cloning the project repository (see: Contributing to Bedrock).

Here is the series of commands to use:

    npm i -g degit
    degit usebedrock/bedrock my-bedrock-project
    cd my-bedrock-project/
    npm install
    npm start

## Bedrock bases

For the Bootstrap 4 base, use the following commands:

    npm i -g degit
    degit usebedrock/bedrock#bootstrap4base my-bootstrap-project
    cd my-bootstrap-project/
    npm install
    npm start

For Material design, use the following:

    npm i -g degit
    degit usebedrock/bedrock#materialbase my-material-project
    cd my-material-project/
    npm install
    npm start


## Contributing to the Bedrock project

Read the active issues on <a href="https://github.com/usebedrock/bedrock/issues">Github</a>.

Clone this repository:

    git clone git@github.com:usebedrock/bedrock.git
    
The latest development usually happen in feature branches or in the `development` branch.

Make sure to make a branch for yourself - and if you have something meaningful to contribute, send us a PR!

## Contact the authors

* Johan's DM inbox is open for questions: https://twitter.com/wolfr_2

## Major commands

* `npm start`: runs the prototype
* `npm run build`: create a build (which ends up in the `dist` folder) that can be deployed to a server

## Upgrading bedrock

Upgrading your Bedrock prototype is done through a CLI tool, which you install globally.

    npm i -g bedrock-cli
    bedrock upgrade

To upgrade to the development branch:

    bedrock upgrade --dev

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

Bedrock was made by the team at [Mono](https://mono.company). Bedrock was initially written by [Thomas Tuts](http://thomastuts.com/).
