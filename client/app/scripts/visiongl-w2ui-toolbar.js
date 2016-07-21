	"use strict";
	//Toolbar
	$(function() {
		$('#toolbar').w2toolbar({
			name: 'toolbar',
			items: [{
				type: 'menu',
				id: 'filemenu',
				caption: 'Menu',
				items: [{
					text: 'New',
					icon: 'fa fa-file',
					style: 'width: 60px'
				}, {
					text: 'New Procedure',
					icon: 'fa fa-file'
				}, {
					text: 'Open',
					icon: 'fa fa-folder-open'
				}, {
					text: 'Save',
					icon: 'fa fa-save'
				}, {
					text: 'Export .wk',
					icon: 'fa fa-file-zip-o'
				}, {
					text: 'Import .wk',
					icon: 'fa fa-file-zip-o'
				}]
			}, {
				type: 'menu',
				id: 'glyphmenu',
				caption: 'Glyph',
				items: [{
					text: 'Duplicate',
					icon: 'fa fa-clone'
				}, {
					text: 'Delete',
					icon: 'fa fa-trash'
				}, {
					text: 'Lock/Unlock Glyph',
					icon: 'fa fa-lock'
				}]
			}, {
				type: 'menu',
				id: 'helpmenu',
				caption: 'Help',
				items: [{
					text: 'Documentation',
					icon: 'fa fa-file-text'
				}, {
					text: 'About',
					icon: 'fa fa-life-bouy'
				}]
			}, ]
		});
		w2ui.toolbar.on('click', function(event) {

			console.log('item ' + event.target + ' was clicked.');

			switch (event.target) {

				// New Workspace
				case 'filemenu:New':
					workspace_new();
					break;

					// New Procedure
				case 'filemenu:New Procedure':
					window.open("procedure.html");
					break;

					// Open Workspace
				case 'filemenu:Open':
					workspace_load();
					break;

					// Save Workspace
				case 'filemenu:Save':
					workspace_save();
					break;

					// Export to .wk
				case 'filemenu:Export .wk':
					console.log(workspace_export_wk(prompt("Please enter your name", "VISIONGL"), prompt("Please the file path", "/home")));
					break;

					// Import from .wk
				case 'filemenu:Import .wk':
					console.log(workspace_import_wk(prompt("Please enter the .wk str", "# Khoros Visual Programming Workspace...")));
					break;

					// Glyph Duplicate
				case 'glyphmenu:Duplicate':
					cloneglyph(true);
					console.log("Duplicate: "+selected);
					break;

					// Glyph Delete
				case 'glyphmenu:Delete':
					deleteGlyph(selected);
					console.log("Delete");
					break;

					// Glyph Lock
				case 'glyphmenu:Lock/Unlock Glyph':
					lockGlyph(selected);
					console.log("Lock");
					break;

					// Help Documentation
				case 'helpmenu:Documentation':
					console.log("Documentation");
					window.open("https://github.com/ddantas/Interface-Web/wiki");
					break;

					// Help About
				case 'helpmenu:About':
					console.log("About");
					window.open("https://github.com/ddantas/Interface-Web");
					break;
			}
		});
	});
