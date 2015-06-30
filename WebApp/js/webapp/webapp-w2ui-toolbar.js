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
  w2ui.toolbar.on('click', function(event) {
    console.log('item ' + event.target + ' is clicked.');
    switch (event.target) {
      case 'item1:New':
        if (confirm('Your changes will be lost if start a new project without saving!!!')) {
          console.log("Reloading page!!!");
          location.reload();
        } else {
          console.log("New canceled!!!");
        }
        break;
      case 'item1:Open':
        if (confirm('Your changes will be lost if you open a project without saving!!!')) {
          console.log("Saving file!!!");
          var load = prompt("Please enter the tags", "String");
          document.getElementById('maindiv').innerHTML = load;
          $("#maindiv .ui-widget-header").click(selectblock);
          $("#maindiv .ui-widget-content").click(selectblock);
          jsPlumb.draggable($(drag_object), drag_options); // Add drag to block
          addtoolbar();
        } else {
          console.log("Open canceled!!!");
        }
        break;
      case 'item1:Save':
        var vgl_file = document.getElementById('maindiv').innerHTML;
        console.log('VGL File: ', vgl_file);
        try {
          var blob = new Blob([text], {
            type: "text/plain;charset=utf-8"
          });
          saveAs(blob, vgl_file);
        } catch (e) {
          console.log("saveAs not supported!!! Error: ", e);
        }
        break;
    }
  });
});
