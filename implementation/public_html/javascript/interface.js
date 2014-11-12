// Connections
jsPlumb.ready(function() {
jsPlumb.makeSource($('.item'), {
connector: 'Flowchart'
});
jsPlumb.makeTarget($('.item'), {
anchor: 'Continuous'
});
});

// Drag
$(function() {    
    $( "#bloco" ).draggable({ containment: "parent" });
});