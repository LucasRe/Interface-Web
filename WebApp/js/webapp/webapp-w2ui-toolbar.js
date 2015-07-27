//Toolbar
$(function() {
  $('#toolbar').w2toolbar({
    name: 'toolbar',
    items: [{
      type: 'menu',
      id: 'item1',
      caption: 'Menu',
      items: [{
        text: 'New',
        icon: 'icon-page'
      }, {
        text: 'New Procedure',
        icon: 'icon-page'
      }, {
        text: 'Open',
        icon: 'icon-page'
      }, {
        text: 'Save',
        icon: 'icon-page'
      }, {
        text: 'Export .wk',
        icon: 'icon-page'
      }, {
        text: 'Import .wk',
        icon: 'icon-page'
      }]
    }, {
      type: 'menu',
      id: 'item2',
      caption: 'Edit',
      items: [{
        text: 'Duplicate',
        icon: 'icon-page'
      }, {
        text: 'Delete',
        icon: 'icon-page'
      }]
    }, {
      type: 'menu',
      id: 'item3',
      caption: 'Help',
      items: [{
        text: 'Documentation',
        icon: 'icon-page'
      }, {
        text: 'About',
        icon: 'icon-page'
      }]
    }, ]
  });
  w2ui.toolbar.on('click', function(event) {
    console.log('item ' + event.target + ' is clicked.');
    switch (event.target) {
      case 'item1:New':
        workspace_new();
        break;

        // Open workspace
      case 'item1:Open':
        workspace_load()
        break;

        // Save workspace
      case 'item1:Save':
        workspace_save();
        break;

        // Export.wk
      case 'item1:Export .wk':
        console.log(workspace_export_wk(prompt("Please enter your name", "VISIONGL"), prompt("Please the file path", "/home")));
        break;
    }
  });
});