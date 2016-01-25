"use strict";
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
  var glyphs = $(CONTAINER_ID).children(".glyph");
  console.log(glyphs);
  console.log(glyphs.length + " BLOCOS");
  for (var i = 0; i < glyphs.length; i++) {
    var glyph_name = $($(glyphs[i]).children('div')[0]).text();
    console.log(glyph_name);
    var glyph_pos = $(glyphs[i]).position();
    console.log(glyph_pos);
    var glyph_id = $(glyphs[i]).attr('id').split('_')[1];
    console.log(glyph_id);
    var glyph_input_names = $(glyphs[i]).children('.ui-widget-content').children('p');
    console.log(glyph_input_names);
    console.log(glyph_input_names.length + " length");
    var func_name = glyph_name.split(' ').join('_').toLowerCase();
    console.log(func_name);

    // Glyph Comment
    str_wk += '# Glyph ' + '\'' + glyph_name + '\'\n';

    // Mode Connections Comment
    str_nodes += '# Connections ' + '\'' + glyph_name + '\'\n';

    // Glyph info
    str_wk += 'Glyph:' + LIB + ':' + func_name + '::localhost:' + glyph_id + ':' + glyph_pos.left + ':' + glyph_pos.top + '::';
    for (var j = 0; j < glyph_input_names.length; j++) {
      console.log($(glyph_input_names[j]).children('span').hasClass('vertex in'));
      if ($(glyph_input_names[j]).children('span').hasClass('vertex in')) {
        str_wk += " -" + $(glyph_input_names[j]).text().trim();
      } else if ($(glyph_input_names[j]).children('span').hasClass('vertex out')) {
        // .wk Connections
        var con_source = $(glyph_input_names[j]).children('.vertex.out').attr('id');
        var glyph_connections = jsPlumb.getConnections({
          scope: [],
          source: con_source
        });
        console.log(con_source);
        console.log(glyph_connections);
        for (var k = 0; k < glyph_connections.length; k++) {
          var out_name = $('#' + glyph_connections[k].sourceId).parent().text().trim();
          console.log(out_name);
          var in_name = $('#' + glyph_connections[k].targetId).parent().text().trim();
          console.log(in_name);
          var in_parent_id = $('#' + glyph_connections[k].targetId).parent().parent().parent().attr('id').split('_')[1];
          console.log(in_parent_id);
          str_nodes += 'NodeConnection:data:' + glyph_id + ':' + out_name + ':' + in_parent_id + ':' + in_name + '\n';
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

  // SaveZip
  var zip = new JSZip();
  zip.file(user_name + ".wk", str_wk);
  var img = zip.folder("images");
  var content = zip.generate({
    type: "blob"
  });
  // see FileSaver.js
  saveAs(content, project_name + ".zip");

  return str_wk;
}

// Import from .wk
function workspace_import_wk(wk) {

  // Clear the container
  $(CONTAINER_ID).empty();

  var glyph_connections = [];
  glyph_count = 0;
  console.log(wk);
  var wk_lines = wk.split('\n');
  console.log(wk_lines);
  console.log(wk_lines.length);
  var glyph_lib = $('#librarycontainer').find('.lglyph');
  for (var l = 0; l < wk_lines.length; l++) {
    console.log('wk_lines[' + l + ']');
    if (wk_lines[l].substring(0, 5) == 'Glyph') {
      console.log(wk_lines[l].substring(0, 5));
      var wk_lines_glyphs = wk_lines[l].split(':');
      console.log('Function: ' + wk_lines_glyphs[2]);
      console.log('ID: ' + wk_lines_glyphs[5]);
      console.log('X: ' + wk_lines_glyphs[6]);
      console.log('Y: ' + wk_lines_glyphs[7]);

      if (glyph_count < wk_lines_glyphs[5]) {
        glyph_count = wk_lines_glyphs[5];
      }

      var idn = 'Glyph_' + wk_lines_glyphs[5],
        idt = '#' + idn;

      var glyph;

      for (var y = 0; y < glyph_lib.length; y++) {
        var glyph_title = (($(glyph_lib[y]).find('.ui-widget-header').text()).toLowerCase());
        if (glyph_title == (wk_lines_glyphs[2].toLowerCase().split('_')).join(' ')) {
          glyph = $(glyph_lib[y]).clone();
          console.log(glyph);
          break;
        }
      }

      //var glyph = $($('#librarycontainer').find('.lglyph')[0]).clone();
      glyph.css({
        left: wk_lines_glyphs[6] + 'px',
        top: wk_lines_glyphs[7] + 'px'
      }).attr('id', idn).removeClass('ui-draggable ui-draggable-handle selected lglyph').addClass('glyph');

      // Change output id
      var exit = glyph.children('.ui-widget-content').children('p').children('.vertex.out');
      for (i = 0; i < exit.length; i++) {

        //Vertex ID
        var vid = idn + '_vout_' + i;

        if ($(exit[i]).hasClass('image')) {
          vid = vid + 'image';
          $(exit[i]).attr('id', vid);
          jsPlumb.makeSource($(exit[i]), {
            scope: 'image',
          });
        } else if ($(exit[i]).hasClass('int')) {
          vid = vid + 'int';
          $(exit[i]).attr('id', vid);
          jsPlumb.makeSource($(exit[i]), {
            scope: 'int'
          });
        } else if ($(exit[i]).hasClass('float')) {
          vid = vid + 'float';
          $(exit[i]).attr('id', vid);
          jsPlumb.makeSource($(exit[i]), {
            scope: 'float'
          });
        } else {
          vid = vid + 'char';
          $(exit[i]).attr('id', vid);
          jsPlumb.makeSource($(exit[i]), {
            scope: 'char'
          });
        }
      }

      // Change input id
      var vin2 = glyph.children('.ui-widget-content').children('p').children('.vertex.in');
      for (i = 0; i < vin2.length; i++) {

        //Vertex ID
        var vid = idn + '_vin_' + i;

        if ($(vin2[i]).hasClass('image')) {
          vid = vid + 'image';
          $(vin2[i]).attr('id', vid);
          jsPlumb.makeTarget($(vin2[i]), {
            maxConnections: 1,
            scope: 'image'
          });
        } else if ($(vin2[i]).hasClass('int')) {
          vid = vid + 'int';
          $(vin2[i]).attr('id', vid);
          jsPlumb.makeTarget($(vin2[i]), {
            maxConnections: 1,
            scope: 'int'
          });
        } else if ($(vin2[i]).hasClass('float')) {
          vid = vid + 'float';
          $(vin2[i]).attr('id', vid);
          jsPlumb.makeTarget($(vin2[i]), {
            maxConnections: 1,
            scope: 'float'
          });
        } else {
          vid = vid + 'char';
          $(vin2[i]).attr('id', vid);
          jsPlumb.makeTarget($(vin2[i]), {
            maxConnections: 1,
            scope: 'char'
          });
        }
      }

      if ($(glyph).find('.btn').length > 0) {
        $(glyph).find('.btn').attr('disabled', false);
        grid_xyz[('grid_' + wk_lines_glyphs[5])] = {
          x: 3,
          y: 3,
          z: 3
        };
      }


      glyph.children('.ui-widget-header').append("<span></span>");
      glyph.children('.ui-widget-header').children('span').addClass("ui-icon ui-icon-gear glyphoptions");

      glyph.appendTo($(CONTAINER_ID)); // Append glyph to container
      console.log(glyph);
      add_select();
      jsPlumb.draggable($(idt), DRAG_OPTIONS); // Add drag to glyph
      addtoolbar();
      change_input_value();
      open_cwpopup();
      config.grid.name = 'grid_' + wk_lines_glyphs[5];
      $('#grid_' + wk_lines_glyphs[5]).w2grid(config.grid);

    } else if (wk_lines[l].substring(0, 14) == 'NodeConnection') {
      // Connections
      console.log(wk_lines[l].substring(0, 14));
      var wk_lines_nc = wk_lines[l].split(':');
      console.log('Out ID: ' + wk_lines_nc[2]);
      console.log('Out var:  ' + wk_lines_nc[3]);
      console.log('In ID: ' + wk_lines_nc[4]);
      console.log('In var: ' + wk_lines_nc[5]);
      glyph_connections.push({
        'out_id': wk_lines_nc[2],
        'out_var': wk_lines_nc[3],
        'in_id': wk_lines_nc[4],
        'in_var': wk_lines_nc[5]
      })
      console.log(glyph_connections);
    }

  }
  for (var o = 0; o < glyph_connections.length; o++) {
    var conn = {};
    var temp, idsource, idtarget;
    temp = $('#Glyph_' + glyph_connections[o].out_id).find('p');
    console.log('Temp:', temp);
    for (var m = 0; m < temp.length; m++) {
      console.log('ST1' + $(temp[m]).text().trim());
      console.log('ST2' + glyph_connections[o].out_var);
      if ($(temp[m]).text().trim() == glyph_connections[o].out_var) {
        conn['source'] = $($(temp[m]).children('span')).attr('id');
        break;
      }
    }
    temp = $('#Glyph_' + glyph_connections[o].in_id).find('p');
    for (var m = 0; m < temp.length; m++) {
      if ($(temp[m]).text().trim() == glyph_connections[o].in_var) {
        conn['target'] = $($(temp[m]).children('span')).attr('id');
        break;
      }
    }
    console.log(conn);
    jsPlumb.connect(conn);
  }
  return true;
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
    var load = prompt("Please enter the JSON file", "String");

    // Clear the container
    $(CONTAINER_ID).empty();

    // Appent the data to container
    $(CONTAINER_ID).append(load);

    // Add select to glyphs
    add_select();

    // Add drag to glyph
    jsPlumb.draggable($(DRAG_OBJECT), DRAG_OPTIONS);

    // Add the glyphs's toolbar
    addtoolbar();

    // Set Source & Target
    set_sourceANDtarget();

    // Change input value
    change_input_value();

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
    connections_clear.push({
      source: connections[i].sourceId,
      target: connections[i].targetId
    });
  }

  // Clear Selected and Connections
  deselectglyph();
  jsPlumb.detachEveryConnection()

  // Remove drag classes
  var glyphs = $(CONTAINER_ID).children(DRAG_OBJECT);
  for (var i = 0; i < glyphs.length; i++) {
    $(glyphs[i]).removeClass('ui-draggable ui-draggable-handle');
    console.log(glyphs[i]);
  }

  var save_file = {
    glyph_count: glyph_count,
    connections: connections_clear
  }

  save_file.workspace = document.getElementById('workspace').innerHTML;
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

  return JSON.stringify(save_file);
}

// Add select
function add_select() {
  $(CONTAINER_ID + " .ui-widget-header").click(selectglyph);
  $(CONTAINER_ID + " .ui-widget-content").click(selectglyph);
}
