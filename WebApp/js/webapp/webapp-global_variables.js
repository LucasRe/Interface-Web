// Selected Block var initialize
var selected = '';

// Mouse position
var mouse_position = {
  X: 0,
  Y: 0
};

// Block count
var block_count = 0;

// Vertex output class
var vertex_output_class = '.vertex.out';

// Vertex input class
var vertex_input_class = '.vertex.in';

// Container id
var container_id = '#maindiv';

// Block class
var drag_object = '.block';

// Drag options
var drag_options = {
  containment: container_id,
  cursor: "default"
    //cursorAt: { top: 10, right: 10 },
    //handle: ".ui-widget-header"
};

// jsPlumb defaults
var jsP_defaults = {
  Anchor: null,
  Anchors: ["Right", "Left"],
  ConnectionsDetachable: true,
  ConnectionOverlays: [],
  Connector: ["Bezier", {
    curviness: 150
  }, {
    stub: 100
  }],
  Container: null,
  DoNotThrowErrors: false,
  DragOptions: {},
  DropOptions: {},
  Endpoint: null,
  EndpointOverlays: [],
  Endpoints: ["Blank", ["Dot", {
    cssClass: 'hend'
  }]],
  EndpointStyle: {
    fillStyle: "#456"
  },
  EndpointStyles: [null, null],
  EndpointHoverStyle: null,
  EndpointHoverStyles: [null, null],
  HoverPaintStyle: null,
  LabelStyle: {
    color: "black"
  },
  LogEnabled: false,
  Overlays: [],
  MaxConnections: 1,
  PaintStyle: {
    lineWidth: 2,
    strokeStyle: "#456"
  },
  ReattachConnections: false,
  RenderMode: "svg",
  Scope: "jsPlumb_DefaultScope"
};
