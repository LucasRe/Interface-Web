// Variables

// Selected Block var initialize
var selected = '';

// Mouse position
var mouse = {
  X: 0,
  Y: 0
};

// Block count
var blockcount = 0;

// Vertex output class
var vertex_output_class = '.vertex.out';

// Vertex input class
var vertex_input_class = '.vertex.in';

// Container id
var container_id = '#maindiv';

// Block class
var dragob = '.block';

// Drag options
var dragop = {
  containment: container_id,
  cursor: "default"
    //cursorAt: { top: 10, right: 10 },
    //handle: ".ui-widget-header"
};

// END Variables

function export_wk(user_name, file_path) {

  // .wk header
  var creation_date = Date();
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
  // END .wk Glyphs

  // .wk Connections
  // END .wk Connections

  // .wk footer
  str_wk += '\n';
  str_wk += 'AnnotationsBegin\n';
  str_wk += '\n';
  str_wk += 'AnnotationsEnd\n';
  str_wk += '\n';
  str_wk += 'WorkspaceEnd: 2.1\n';
  // END .wk footer

  console.log(str_wk);
  return str_wk;
}

//Toolbar
function addtoolbar() {
  $('.ui-icon-gear').toolbar({
    content: '#format-toolbar-options',
    position: 'top',
    hideOnClick: true
  });
}

// Resize
function resize() {
  $(".block").resizable({
    maxHeight: 250,
    maxWidth: 360,
    minHeight: 150,
    minWidth: 80,
    aspectRatio: 1
  });
}

// Select Function
function selectblock() {
  if (selected == '') {
    selected = $(this).parent();
    selected.addClass('selected');
  } else {
    selected.removeClass('selected');
    selected = $(this).parent();
    selected.addClass('selected');
  }
}

// Clone Block
function cloneblock(obj, event, ui) {

  // Generate id
  blockcount++;
  var idn = 'Block' + blockcount,
    idt = '#' + idn;

  // Object from?
  if (obj) {
    var objpos = selected.position();
    var block = $(selected).clone();
    block.css({
      left: objpos.left + 50 + 'px',
      top: objpos.top + 'px'
    }).attr('id', idn).removeClass('ui-draggable selected');
  } else {
    var block = $(ui.draggable).clone();
    block.css({
      left: mouse.X + 'px',
      top: mouse.Y + 'px'
    }).attr('id', idn).removeClass('ui-draggable selected lblock').addClass('block');
  }

  // Change output id
  var exit = block.children('.ui-widget-content').children('p').children('.vertex.out');
  for (i = 0; i < exit.length; i++) {

    //Vertex ID
    var vid = idn + 'v' + i;

    if ($(exit[i]).hasClass('image')) {
      vid = vid + 'image';
      $(exit[i]).attr('id', vid);
      jsPlumb.makeSource($(exit[i]), {
        scope: 'image'
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
  var vin2 = block.children('.ui-widget-content').children('p').children('.vertex.in');
  for (i = 0; i < vin2.length; i++) {

    //Vertex ID
    var vid = idn + 'v' + i;

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

  if (!obj) {
    block.children('.ui-widget-header').append("<span></span>");
    block.children('.ui-widget-header').children('span').addClass("ui-icon ui-icon-gear blockoptions");
  }
  block.appendTo($(container_id)); // Append block to container
  $("#maindiv .ui-widget-header").click(selectblock);
  $("#maindiv .ui-widget-content").click(selectblock);
  jsPlumb.draggable($(idt), dragop); // Add drag to block
  addtoolbar();
}
