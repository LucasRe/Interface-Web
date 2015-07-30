//Toolbar
function addtoolbar() {
  $('.ui-icon-gear').toolbar({
    content: '#toolbar-options',
    position: 'top',
    hideOnClick: true
  });
}

// Change inpute value
function change_input_value() {
  $("input").change(function() {
    console.log('BEFORE: value = ' + $(this).attr('value') + ' val = ' + $(this).val());
    $(this).attr('value', $(this).val());
    console.log('AFTER: value = ' + $(this).attr('value') + ' val = ' + $(this).val());
  });
}

// Resize
function resize() {
  $(DRAG_OBJECT).resizable({
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

// Select Function
function deselectblock() {
  if (selected != '') {
    selected.removeClass('selected');
    selected = '';
  }
}

// Clone Block
function cloneblock(obj, event, ui) {

  // Generate id
  block_count++;
  var idn = 'Block_' + block_count,
    idt = '#' + idn;

  // Object from?
  if (obj) {
    var objpos = selected.position();
    var block = $(selected).clone();
    block.css({
      left: objpos.left + 100 + 'px',
      top: objpos.top + 'px'
    }).attr('id', idn).removeClass('ui-draggable selected');
  } else {
    var block = $(ui.draggable).clone();
    block.css({
      left: mouse_position.X + 'px',
      top: mouse_position.Y + 'px'
    }).attr('id', idn).removeClass('ui-draggable selected lblock').addClass('block');
  }

  // Change output id
  var exit = block.children('.ui-widget-content').children('p').children('.vertex.out');
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
  var vin2 = block.children('.ui-widget-content').children('p').children('.vertex.in');
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

  if ($(block).find('.btn').length > 0) {
    $(block).find('.btn').attr('disabled', false);
    grid_xyz[('grid_' + block_count)] = {x:3,y:3,z:3};
  }

  if (!obj) {
    block.children('.ui-widget-header').append("<span></span>");
    block.children('.ui-widget-header').children('span').addClass("ui-icon ui-icon-gear blockoptions");
  }

  block.appendTo($(CONTAINER_ID)); // Append block to container
  console.log(block);
  add_select();
  jsPlumb.draggable($(idt), DRAG_OPTIONS); // Add drag to block
  addtoolbar();
  change_input_value();
  open_cwpopup();
  config.grid.name = 'grid_' + block_count;
  $('#grid_' + block_count).w2grid(config.grid);
}
