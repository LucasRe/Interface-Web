// Connections
jsPlumb.ready(function() {

  //jsPlumb set container
  jsPlumb.setContainer($(container_id));

  // Vertex image
  jsPlumb.makeSource($(vertex_output_class + '.image'), {
    scope: 'image'
  });
  // Vertex image
  jsPlumb.makeTarget($(vertex_input_class + '.image'), {
    maxConnections: 1,
    scope: 'image'
  });

  // Vertex int
  jsPlumb.makeSource($(vertex_output_class + '.int'), {
    scope: 'int'
  });
  // Vertex int
  jsPlumb.makeTarget($(vertex_input_class + '.int'), {
    maxConnections: 1,
    scope: 'int'
  });

  // Vertex float
  jsPlumb.makeSource($(vertex_output_class + '.float'), {
    scope: 'float'
  });
  // Vertex float
  jsPlumb.makeTarget($(vertex_input_class + '.float'), {
    maxConnections: 1,
    scope: 'float'
  });

  // // Vertex Char Source
  // jsPlumb.makeSource($(vertex_output_class + '.char'), {
  //     scope: 'char'
  // });
  // // Vertex Char Target
  // jsPlumb.makeTarget($(vertex_input_class + '.char'), {
  //     maxConnections: 1,
  //     scope: 'char'
  // });

  // Drag Block
  jsPlumb.draggable($(dragob), dragop);
});
