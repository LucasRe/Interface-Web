"use strict";
$(document).ready(function() {

	$(document).foundation();

	// Mouse track
	$(CONTAINER_ID).mousemove(function(event) {
		mouse_position.X = event.clientX;
		mouse_position.Y = event.clientY;
	});

	// Library Toggle
	$("#librarytoggle").click(function() {
		$("#librarybody").slideToggle('slow');

	});

	// Library Tabs
	$(function() {
		$("#tabs").tabs();
	});

	// Library Clone
	$(function() {
		$(".lglyph").draggable({
			opacity: 0.7,
			revert: true,
			helper: "clone"
		});
	});

	//Droppable clone from Lib
	$(CONTAINER_ID).droppable({
		accept: ".lglyph",
		//activeClass: "ui-state-hover",
		//hoverClass: "ui-state-active",
		drop: function(event, ui) {
			// Call Clone function for lib glyphs
			cloneglyph(false, event, ui);
		}
	});

	// Select Glyph
	add_select();

	// Deselect Glyph
	$(CONTAINER_ID).dblclick(function() {
		deselectglyph();
	});

	// Clone Glyph
	$(".clone").click(function() {
		cloneglyph(true);
	});

	// Lock/Unlock Glyph
	$(".lock").click(function() {
		if (!($(selected).hasClass('ui-draggable-disabled'))) {
			jsPlumb.setDraggable($(selected), false);
		} else {
			jsPlumb.setDraggable($(selected), true);
		}
	});

	// Remove Glyph
	$(".delete").click(function() {
		var vertex = selected.children('.ui-widget-content').children('p').children('span');
		for (i = 0; i < vertex.length; i++) {
			jsPlumb.detachAllConnections(vertex[i]);
		}
		selected.remove();
		$(CONTAINER_ID).dblclick();
		$(CONTAINER_ID).click();
	});

});
