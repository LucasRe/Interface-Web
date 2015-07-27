$(document).ready(function() {

  // Mouse track
  $(CONTAINER_ID).mousemove(function(event) {
    mouse_position.X = event.clientX;
    mouse_position.Y = event.clientY;
  });

  // Library Toggle
  $("#librarytoggle").click(function() {
    $("#librarybody").slideToggle('slow');

  });

  // Library Tabs
  $(function() {
    $("#tabs").tabs();
  });

  // Library Clone
  $(function() {
    $(".lblock").draggable({
      opacity: 0.7,
      revert: true,
      helper: "clone"
    });
  });

  //Droppable clone from Lib
  $(CONTAINER_ID).droppable({
    accept: ".lblock",
    //activeClass: "ui-state-hover",
    //hoverClass: "ui-state-active",
    drop: function(event, ui) {
      // Call Clone function for lib blocks
      cloneblock(false, event, ui);
    }
  });

  // Select Block
  add_select();

  // Deselect Block
  $(CONTAINER_ID).dblclick(function() {
    deselectblock();
  });

  // Clone Block
  $(".clone").click(function() {
    cloneblock(true);
  });

  // Lock/Unlock Block
  $(".lock").click(function() {
    if (!($(selected).hasClass('ui-draggable-disabled'))) {
      jsPlumb.setDraggable($(selected), false);
    } else {
      jsPlumb.setDraggable($(selected), true);
    }
  });

  // Remove Block
  $(".delete").click(function() {
    var vertex = selected.children('.ui-widget-content').children('p').children('span');
    for (i = 0; i < vertex.length; i++) {
      jsPlumb.detachAllConnections(vertex[i]);
    }
    selected.remove();
    $(CONTAINER_ID).dblclick();
    $(CONTAINER_ID).click();
  });

});