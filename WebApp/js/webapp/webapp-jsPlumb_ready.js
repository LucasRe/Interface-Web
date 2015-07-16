// Import default config
jsPlumb.importDefaults(JSPLUMB_DEFAULTS);

// Set source and target vertexs
function set_sourceANDtarget() {

  // Vertex image
  jsPlumb.makeSource($(VERTEX_OUTPUT_CLASS + '.image'), {
    scope: 'image'
  });

  // Vertex image
  jsPlumb.makeTarget($(VERTEX_INPUT_CLASS + '.image'), {
    maxConnections: 1,
    scope: 'image'
  });

  // Vertex int
  jsPlumb.makeSource($(VERTEX_OUTPUT_CLASS + '.int'), {
    scope: 'int'
  });

  // Vertex int
  jsPlumb.makeTarget($(VERTEX_INPUT_CLASS + '.int'), {
    maxConnections: 1,
    scope: 'int'
  });

  // Vertex float
  jsPlumb.makeSource($(VERTEX_OUTPUT_CLASS + '.float'), {
    scope: 'float'
  });

  // Vertex float
  jsPlumb.makeTarget($(VERTEX_INPUT_CLASS + '.float'), {
    maxConnections: 1,
    scope: 'float'
  });

  // // Vertex Char Source
  // jsPlumb.makeSource($(VERTEX_OUTPUT_CLASS + '.char'), {
  //     scope: 'char'
  // });
  // // Vertex Char Target
  // jsPlumb.makeTarget($(VERTEX_INPUT_CLASS + '.char'), {
  //     maxConnections: 1,
  //     scope: 'char'
  // });
}

jsPlumb.ready(function() {

  //jsPlumb set container
  jsPlumb.setContainer($(CONTAINER_ID));

});
