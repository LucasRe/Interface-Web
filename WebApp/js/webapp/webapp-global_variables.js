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
var VERTEX_OUTPUT_CLASS = '.vertex.out';

// Vertex input class
var VERTEX_INPUT_CLASS = '.vertex.in';

// Container id
var CONTAINER_ID = '#maindiv';

// Block class
var DRAG_OBJECT = '.block';

// Drag options
var DRAG_OPTIONS = {
  containment: CONTAINER_ID,
  cursor: "default"
    //cursorAt: { top: 10, right: 10 },
    //handle: ".ui-widget-header"
};

// jsPlumb defaults
var JSPLUMB_DEFAULTS = {
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
    lineWidth: 2.5,
    strokeStyle: "#456"
  },
  ReattachConnections: false,
  RenderMode: "svg",
  Scope: "jsPlumb_DefaultScope"
};
