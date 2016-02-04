"use strict";

// Shortcuts

// Help
key('ctrl+h', function() {
	console.log('CTRL+H pressed!!!');
	window.open("https://github.com/ddantas/Interface-Web");
	return false;
});

// Delete
key('delete', function() {
	console.log('Delete key pressed!!!');
});

// Duplicate
key('ctrl+d', function() {
	console.log('CTRL+D pressed!!!');
});
