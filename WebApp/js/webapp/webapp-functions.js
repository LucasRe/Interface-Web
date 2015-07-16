// Export workspace to .wk
function workspace_export_wk(user_name, file_path) {

  var LIB = 'VISIONGL';

  // .wk header
  var creation_date = Date();
  var str_nodes = '';
  var str_wk = '# Khoros Visual Programming Workspace\n';
  str_wk += '#\n';
  str_wk += '# cantata workspace file (' + file_path + '.wk) was created\n';
  str_wk += '# on ' + creation_date + '\n';
  str_wk += '# by user ' + user_name + '\n';
  str_wk += '#\n';
  str_wk += '\n';
  str_wk += 'WorkspaceBegin: 2.1\n';
  str_wk += '\n';
  str_wk += 'VariablesBegin:\n';
  str_wk += '\n';
  str_wk += '\n';
  str_wk += '\n';
  str_wk += '# No variables currently declared. #\n';
  str_wk += '\n';
  str_wk += 'VariablesEnd:\n';
  str_wk += '\n';
  // END .wk header

  // .wk Glyphs
  var blocks = $(CONTAINER_ID).children(".block");
  console.log(blocks);
  console.log(blocks.length + " BLOCOS");
  for (var i = 0; i < blocks.length; i++) {
    var block_name = $($(blocks[i]).children('div')[0]).text();
    console.log(block_name);
    var block_pos = $(blocks[i]).position();
    console.log(block_pos);
    var block_id = $(blocks[i]).attr('id').split('_')[1];
    console.log(block_id);
    var block_input_names = $(blocks[i]).children('.ui-widget-content').children('p');
    console.log(block_input_names);
    console.log(block_input_names.length + " length");
    var func_name = block_name.split(' ').join('_').toLowerCase();
    console.log(func_name);

    // Glyph Comment
    str_wk += '# Glyph ' + '\'' + block_name + '\'\n';

    // Mode Connections Comment
    str_nodes += '# Connections ' + '\'' + block_name + '\'\n';

    // Glyph info
    str_wk += 'Glyph:' + LIB + ':' + func_name + '::localhost:' + block_id + ':' + block_pos.left + ':' + block_pos.top + '::';
    for (var j = 0; j < block_input_names.length; j++) {
      console.log($(block_input_names[j]).children('span').hasClass('vertex in'));
      if ($(block_input_names[j]).children('span').hasClass('vertex in')) {
        str_wk += " -" + $(block_input_names[j]).text().trim();
      } else if ($(block_input_names[j]).children('span').hasClass('vertex out')) {
        // .wk Connections
        var con_source = $(block_input_names[j]).children('.vertex.out').attr('id');
        var block_connections = jsPlumb.getConnections({
          scope: [],
          source: con_source
        });
        console.log(con_source);
        console.log(block_connections);
        for (var k = 0; k < block_connections.length; k++) {
          var out_name = $('#' + block_connections[k].sourceId).parent().text().trim();
          console.log(out_name);
          var in_name = $('#' + block_connections[k].targetId).parent().text().trim();
          console.log(in_name);
          var in_parent_id = $('#' + block_connections[k].targetId).parent().parent().parent().attr('id').split('_')[1];
          console.log(in_parent_id);
          str_nodes += 'NodeConnection:data:' + block_id + ':' + out_name + ':' + in_parent_id + ':' + in_name + '\n';
        }
        // END .wk Connections
      }
    }
    str_nodes += '\n';
    str_wk += '\n\n'
  }
  // END .wk Glyphs

  str_wk += str_nodes;

  // .wk footer
  str_wk += 'AnnotationsBegin\n';
  str_wk += '\n';
  str_wk += 'AnnotationsEnd\n';
  str_wk += '\n';
  str_wk += 'WorkspaceEnd: 2.1\n';
  // END .wk footer

  return str_wk;
}

// New Workspace
function workspace_new() {
  if (confirm('Your changes will be lost if start a new project without saving!!!')) {
    console.log("Reloading page!!!");
    location.reload();
  } else {
    console.log("New canceled!!!");
  }
}

// Load Workspace
function workspace_load() {
  if (confirm('Your changes will be lost if you open a project without saving!!!')) {
    console.log("Saving file!!!");
    var load = prompt("Please enter the tags", "String");

    // Clear the container
    $(CONTAINER_ID).empty();

    // Appent the data to container
    $(CONTAINER_ID).append(load);

    // Add select to blocks
    add_select();

    // Add drag to block
    jsPlumb.draggable($(DRAG_OBJECT), DRAG_OPTIONS);

    // Add the blocks's toolbar
    addtoolbar();

    // Set Source & Target
    set_sourceANDtarget();

  } else {
    console.log("Open canceled!!!");
  }
}

// Save Workspace
function workspace_save() {

  // Save Connections
  var connections = jsPlumb.getAllConnections();
  var connections_clear = [];
  for (var i = 0; i < connections.length; i++) {
    connections_clear.push({source:connections[i].sourceId, target:connections[i].targetId});
  }

  // Clear Selected and Connections
  deselectblock();
  jsPlumb.detachEveryConnection()

  // Remove drag classes
  var blocks = $(CONTAINER_ID).children(DRAG_OBJECT);
  for (var i = 0; i < blocks.length; i++) {
    $(blocks[i]).removeClass('ui-draggable ui-draggable-handle');
    console.log(blocks[i]);
  }

  var save_file = {
    block_count: block_count,
    connections_clear
  };

  save_file.workspace = document.getElementById('maindiv').innerHTML;
  save_file.custom = document.getElementById('tabs-custom').innerHTML;
  console.log('Save File: ', save_file);
  console.log('Save File: ', JSON.stringify(save_file));

  try {
    var blob = new Blob([text], {
      type: "text/plain;charset=utf-8"
    });
    saveAs(blob, save_file);
  } catch (e) {
    console.log("saveAs not supported!!! Error: ", e);
  }

  // Restore connections
  for (var i = 0; i < connections_clear.length; i++) {
    jsPlumb.connect(connections_clear[i]);
  }

}

// Add select
function add_select() {
  $(CONTAINER_ID + " .ui-widget-header").click(selectblock);
  $(CONTAINER_ID + " .ui-widget-content").click(selectblock);
}