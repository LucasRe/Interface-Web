# VisionGL Web-Interface

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) v4.3.0 (with NPM 2.14.12) [How to install](https://nodejs.org/en/download/package-manager/)
* [Bower](http://bower.io/) * `sudo npm install -g bower`
* [Grunt CLI](http://gruntjs.com/) * `sudo npm install -g grunt-cli`
* [RethinkDB](http://rethinkdb.com/) - [How to install](http://rethinkdb.com/docs/install/)

### Dev Tools suggestion
- [Atom](https://atom.io/)
- [Chromium](https://www.chromium.org/) or [Chrome](https://www.google.com/chrome/)

### Server Framework
* [Expres](http://expressjs.com)

### Client dependencies
Please look [bower.json](https://github.com/ddantas/Interface-Web/blob/master/client/bower.json)

## Installation

* `git clone https://github.com/ddantas/Interface-Web.git` this repository

change into the new directory

change into "client directory" * `cd client`

run:
* `npm install`
* `bower install`

On project root:

change to server directory * `cd server`

run:
* `npm install`


## Running / Development
On client directory(On project root,* `cd client`):

* `grunt serve` - Visit the app at [http://localhost:9000](http://localhost:9000).

* `grunt watch` - Run predefined tasks whenever watched file patterns are added, changed or deleted.

* `grunt wiredep` - Finds your components and injects them directly into the HTML file you specify.

### Running Tests

* `grunt test`

### Building
On project root:

* `cd client`

* `grunt build`


