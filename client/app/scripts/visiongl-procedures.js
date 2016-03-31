"use strict";

// ID names
var PROCEDUREIN_ID = '#procedurein';
var PROCEDUREOUT_ID = '#procedureout';

// ADD draggable
jsPlumb.draggable($(PROCEDUREIN_ID), DRAG_OPTIONS);
jsPlumb.draggable($(PROCEDUREOUT_ID), DRAG_OPTIONS);

// null Vertex
jsPlumb.makeSource($('.procedureins'), {
  scope: 'image'
});

// Vertex image
jsPlumb.makeTarget($(VERTEX_INPUT_CLASS + '.image'), {
  maxConnections: 1,
  scope: 'image'
});
