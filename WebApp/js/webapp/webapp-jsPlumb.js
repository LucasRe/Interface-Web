// Vertex output class
var vout = '.vertex.out';
// Vertex input class
var vin = '.vertex.in';
// Container id
var container = '#maindiv';
// Block class
var dragob = '.block';
// Drag options
var dragop = {
    containment: container,
    cursor: "default"
        //cursorAt: { top: 10, right: 10 },
        //handle: ".ui-widget-header"
};
// Connections
jsPlumb.ready(function () {

    //jsPlumb set container
    jsPlumb.setContainer($(container));

    // Vertex image
    jsPlumb.makeSource($(vout + '.image'), {
        scope: 'image'
    });
    // Vertex image
    jsPlumb.makeTarget($(vin + '.image'), {
        maxConnections: 1,
        scope: 'image'
    });

    // Vertex int
    jsPlumb.makeSource($(vout + '.int'), {
        scope: 'int'
    });
    // Vertex int
    jsPlumb.makeTarget($(vin + '.int'), {
        maxConnections: 1,
        scope: 'int'
    });

    // Vertex float
    jsPlumb.makeSource($(vout + '.float'), {
        scope: 'float'
    });
    // Vertex float
    jsPlumb.makeTarget($(vin + '.float'), {
        maxConnections: 1,
        scope: 'float'
    });

    // Vertex Char Source
    jsPlumb.makeSource($(vout + '.char'), {
        scope: 'char'
    });
    // Vertex Char Target
    jsPlumb.makeTarget($(vin + '.char'), {
        maxConnections: 1,
        scope: 'char'
    });

    // Drag Block
    jsPlumb.draggable($(dragob), dragop);
});