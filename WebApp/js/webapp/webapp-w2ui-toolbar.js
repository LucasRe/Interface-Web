//Toolbar
$(function() {
  $('#toolbar').w2toolbar({
    name: 'toolbar',
    items: [{
      type: 'menu',
      id: 'item1',
      caption: 'Menu',
      items: [{
        text: 'Open',
        icon: 'icon-page'
      }, {
        text: 'Save',
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

  w2ui.toolbar.on('*', function(event) {
    console.log('EVENT: ' + event.type + ' TARGET: ' + event.target, event);
  });
});
