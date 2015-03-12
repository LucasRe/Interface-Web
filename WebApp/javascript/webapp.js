// Variables
var selected = ''; // Selected Block var initialize 
var mouse = {
        X: 0,
        Y: 0
    } // Hold mouse pos
var vout = '.vertex.out'; // Vertex output class
var vin = '.vertex.in'; // Vertex input class
var container = '#maindiv'; // Container id
var dragob = '.block'; // Block class
var dragop = {
        containment: container,
        cursor: "default",
        //cursorAt: { top: 10, right: 10 },
        handle: ".ui-widget-header"
    } // Drag options

/*// Resize
 function resize(){
     $( ".block" ).resizable({
         maxHeight: 250,
         maxWidth: 360,
         minHeight: 150,
         minWidth: 80,
         //aspectRatio: 16 / 9
     });
 }*/

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
    var idn = Math.floor((Math.random() * 100) + 1),
        idt = '#' + idn;

    // Object from?
    if (obj) {
        var block = $(selected).clone();
        block.css({
            left: mouse.X + 'px',
            top: mouse.Y + 'px'
        }).attr('id', idn).removeClass('ui-draggable selected');
    } else {
        var block = $(ui.draggable).clone();
        block.css({
            left: mouse.X + 'px',
            top: mouse.Y + 'px'
        }).attr('id', idn).removeClass('ui-draggable selected lblock').addClass('block');
    }

    // Change output id
    block.children('.ui-widget-content').children('p').children('.vertex.out').attr('id', 'vo' + idn);
    var exit = block.children('.ui-widget-content').children('p').children('.vertex.out');
    if ($(exit).hasClass('image')) {
        $(exit).attr('id', 'v' + idn + 4);
        jsPlumb.makeSource($(exit), {
            scope: 'image'
        });
    } else if ($(exit).hasClass('int')) {
        $(exit).attr('id', 'v' + idn + 5);
        jsPlumb.makeSource($(exit), {
            scope: 'int'
        });
    } else if ($(exit).hasClass('float')) {
        $(exit).attr('id', 'v' + idn + 6);
        jsPlumb.makeSource($(exit), {
            scope: 'float'
        });
    } else {
        $(exit).attr('id', 'v' + idn + 7);
        jsPlumb.makeSource($(exit), {
            scope: 'char'
        });
    }

    // Change input id
    var vin2 = block.children('.ui-widget-content').children('p').children('.vertex.in');
    for (i = 0; i < vin2.length; i++) {
        if ($(vin2[i]).hasClass('image')) {
            $(vin2[i]).attr('id', 'v' + idn);
            jsPlumb.makeTarget($(vin2[i]), {
                maxConnections: 1,
                scope: 'image'
            });
        } else if ($(vin2[i]).hasClass('int')) {
            $(vin2[i]).attr('id', 'v' + idn + 1);
            jsPlumb.makeTarget($(vin2[i]), {
                maxConnections: 1,
                scope: 'int'
            });
        } else if ($(vin2[i]).hasClass('float')) {
            $(vin2[i]).attr('id', 'v' + idn + 2);
            jsPlumb.makeTarget($(vin2[i]), {
                maxConnections: 1,
                scope: 'float'
            });
        } else {
            $(vin2[i]).attr('id', 'v' + idn + 3);
            jsPlumb.makeTarget($(vin2[i]), {
                maxConnections: 1,
                scope: 'char'
            });
        }
    }

    block.appendTo($(container)); // Append block to container
    $("#maindiv .ui-widget-header").click(selectblock);
    jsPlumb.draggable($(idt), dragop); // Add drag to block
}

$(document).ready(function () {

    // Mouse track               
    $("#maindiv").mousemove(function (event) {
        mouse.X = event.clientX;
        mouse.Y = event.clientY;
    });

    // Library Toggle
    $("#librarytoggle").click(function () {
        $("#librarybody").slideToggle('slow');

    });

    // Library Tabs
    $(function () {
        $("#tabs").tabs();
    });

    $("button#clone").click(function () {
        cloneblock(true);
    });

    // Select Block
    $("#maindiv .ui-widget-header").click(selectblock);

    // DeSelect Block
    $("#maindiv").click(function () {
        if (selected != '') {
            selected.removeClass('selected');
            selected = '';
        }
    });

    // Remove Block
    $("button#delete").click(function () {
        var vertex = selected.children('.ui-widget-content').children('p').children('span');
        for (i = 0; i < vertex.length; i++) {
            jsPlumb.detachAllConnections(vertex[i]);
        }
        selected.remove();
    });

    // Clone from Lib
    $(function () {
        $(".lblock").draggable({
            opacity: 0.7,
            revert: true,
            helper: "clone"
        });
    });

    // Call resize function
    //resize();


    //Droppable clone from Lib
    $("#maindiv").droppable({
        accept: ".lblock",
        //activeClass: "ui-state-hover",
        //hoverClass: "ui-state-active",
        drop: function (event, ui) {
            // Call Clone function for lib blocks
            cloneblock(false, event, ui);
        }
    });

}); // End Document.ready