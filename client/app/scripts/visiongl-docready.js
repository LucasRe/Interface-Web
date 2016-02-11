"use strict";
$(document).ready(function() {

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
		lockGlyph(selected);
	});

	// Delete Glyph
	$(".delete").click(function() {
		deleteGlyph(selected);
});

});
