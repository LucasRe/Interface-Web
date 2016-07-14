"use strict";

// Selected Glyph var initialize
var selected = '';

// Mouse position
var mouse_position = {
	X: 0,
	Y: 0
};

// Glyph count
var glyph_count = 0;

// Project Title
var project_name = 'DEFAULT';

var grid_id = '';

var grid_xyz = {
	default: {
		x: 3,
		y: 3,
		z: 3
	}
};

// Toolbar Options
const TOOLBAR_OPTIONS = {
	content: '#toolbar-options',
	position: 'top',
	style: 'primary',
	event: 'click',
	animation: 'flip',
	hideOnClick: true,
	adjustment: 32
};

// Vertex output class
const VERTEX_OUTPUT_CLASS = '.vertex.out';

// Vertex input class
const VERTEX_INPUT_CLASS = '.vertex.in';

// Container id
const CONTAINER_ID = '#workspace';

// Glyph class
const DRAG_OBJECT = '.glyph';

// Drag options
const DRAG_OPTIONS = {
	containment: CONTAINER_ID,
	cursor: "default"
		//cursorAt: { top: 10, right: 10 },
		//handle: ".ui-widget-header"
};

// jsPlumb defaults
const JSPLUMB_DEFAULTS = {
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
