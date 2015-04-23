$(document).ready(function () {

    // Add Toolbar
    addtoolbar();

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

    // Library Clone
    $(function () {
        $(".lblock").draggable({
            opacity: 0.7,
            revert: true,
            helper: "clone"
        });
    });

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


    // Select Block
    $("#maindiv .ui-widget-header").click(selectblock);
    $("#maindiv .ui-widget-content").click(selectblock);

    // DeSelect Block
    $("#maindiv").dblclick(function () {
        if (selected != '') {
            selected.removeClass('selected');
            selected = '';
        }
    });

    // Clone Block
    $(".clone").click(function () {
        cloneblock(true);
    });

    // Remove Block
    $(".delete").click(function () {
        var vertex = selected.children('.ui-widget-content').children('p').children('span');
        for (i = 0; i < vertex.length; i++) {
            jsPlumb.detachAllConnections(vertex[i]);
        }
        selected.remove();
        $('#maindiv').dblclick();
        $('#maindiv').click();
    });

    // Call resize function
    //resize();    

});