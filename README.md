# VisionGL Web-Interface

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Grunt CLI](http://gruntjs.com/)
* [RethinkDB](http://rethinkdb.com/)

### Tools
- [Atom](https://atom.io/)


## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install` (client and server directory)
* `bower install` (client directory)

## Running / Development

* `grunt serve` - Visit the app at [http://localhost:9000](http://localhost:9000).

* `grunt watch` - Run predefined tasks whenever watched file patterns are added, changed or deleted.

* `grunt wiredep` - Finds your components and injects them directly into the HTML file you specify.

### Running Tests

* `grunt test`

### Building

* `grunt build` (development)
