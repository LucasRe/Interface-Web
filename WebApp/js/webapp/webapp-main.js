// Variables
// Selected Block var initialize
var selected = '';
// Mouse position
var mouse = {
    X: 0,
    Y: 0
};
// Block count
var blockcount = 0;

//Toolbar
function addtoolbar() {
    $('.ui-icon-gear').toolbar({
        content: '#format-toolbar-options',
        position: 'top',
        hideOnClick: true
    });
}

// Resize
function resize() {
    $(".block").resizable({
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

//Copy JSON
function copyToClipboard() {
        alert(JSON.stringify(document.getElementById("maindiv").firstChild()));
    }
    //Paste JSCON
function pasteFrom() {
    $(container).append(JSON.parse(prompt("Teste", "JSON")));
}

// Clone Block
function cloneblock(obj, event, ui) {

    // Generate id
    blockcount++;
    var idn = 'Block' + blockcount,
        idt = '#' + idn;

    // Object from?
    if (obj) {
        var objpos = selected.position();
        var block = $(selected).clone();
        block.css({
            left: objpos.left + 50 + 'px',
            top: objpos.top + 'px'
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

        //Vertex ID
        var vid = idn + 'v' + i;

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

    if (!obj) {
        block.children('.ui-widget-header').append("<span></span>");
        block.children('.ui-widget-header').children('span').addClass("ui-icon ui-icon-gear blockoptions");
    }
    block.appendTo($(container)); // Append block to container
    $("#maindiv .ui-widget-header").click(selectblock);
    $("#maindiv .ui-widget-content").click(selectblock);
    jsPlumb.draggable($(idt), dragop); // Add drag to block
    addtoolbar();
}