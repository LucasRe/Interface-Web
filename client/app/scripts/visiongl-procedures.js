"use strict";

// ID names
var PROCEDUREIN_ID = '#procedurein';
var PROCEDUREOUT_ID = '#procedureout';

// ADD draggable
jsPlumb.draggable($(PROCEDUREIN_ID), DRAG_OPTIONS);
jsPlumb.draggable($(PROCEDUREOUT_ID), DRAG_OPTIONS);

// null Vertex
jsPlumb.makeSource($('.procedurein'), {
	scope: ['image', 'float']
});

// Vertex image
jsPlumb.makeTarget($(VERTEX_INPUT_CLASS + '.image'), {
	maxConnections: 1,
	scope: 'image'
});

// Export workspace to .wksp
function workspace_export_wksp(user_name, file_path, file_name) {

	var LIB = 'VISIONGL';

	// .wksp header
	var creation_date = Date();
	var str_nodes = '';
	var str_wksp = '# Khoros Visual Programming Workspace\n';
	str_wksp += '#\n';
	str_wksp += '# cantata workspace file (' + file_path + '.wksp) was created\n';
	str_wksp += '# on ' + creation_date + '\n';
	str_wksp += '# by user ' + user_name + '\n';
	str_wksp += '#\n';
	str_wksp += '\n';
	str_wksp += 'WorkspaceBegin: 2.1\n';
	str_wksp += '\n';
	str_wksp += 'VariablesBegin:\n';
	str_wksp += '\n';
	str_wksp += '\n';
	str_wksp += '\n';
	str_wksp += '# No variables currently declared. #\n';
	str_wksp += '\n';
	str_wksp += 'VariablesEnd:\n';
	str_wksp += '\n';
	// END .wksp header

	// .wksp Glyphs
	var glyphs = $(CONTAINER_ID).children(".glyph");
	console.log(glyphs);
	console.log(glyphs.length + " BLOCOS");
	for (var i = 0; i < glyphs.length; i++) {
		var glyph_name = $($(glyphs[i]).children('div')[0]).text();
		console.log(glyph_name);
		var glyph_pos = $(glyphs[i]).position();
		console.log(glyph_pos);
		var glyph_id = $(glyphs[i]).attr('id').split('_')[1];
		console.log(glyph_id);
		var glyph_input_names = $(glyphs[i]).children('.ui-widget-content').children('p');
		console.log(glyph_input_names);
		console.log(glyph_input_names.length + " length");
		var func_name = glyph_name.split(' ').join('_').toLowerCase();
		console.log(func_name);

		// Glyph Comment
		str_wksp += '# Glyph ' + '\'' + glyph_name + '\'\n';

		// Mode Connections Comment
		str_nodes += '# Connections ' + '\'' + glyph_name + '\'\n';

		// Glyph info
		str_wksp += 'Glyph:' + LIB + ':' + func_name + '::localhost:' + glyph_id + ':' + glyph_pos.left + ':' + glyph_pos.top + '::';
		for (var j = 0; j < glyph_input_names.length; j++) {
			console.log($(glyph_input_names[j]).children('span').hasClass('vertex in'));
			if ($(glyph_input_names[j]).children('span').hasClass('vertex in')) {
				str_wksp += " -" + $(glyph_input_names[j]).text().trim();
			} else if ($(glyph_input_names[j]).children('span').hasClass('vertex out')) {
				// .wksp Connections
				var con_source = $(glyph_input_names[j]).children('.vertex.out').attr('id');
				var glyph_connections = jsPlumb.getConnections({
					scope: [],
					source: con_source
				});
				console.log(con_source);
				console.log(glyph_connections);
				for (var k = 0; k < glyph_connections.length; k++) {
					var out_name = $('#' + glyph_connections[k].sourceId).parent().text().trim();
					console.log(out_name);
					var in_name = $('#' + glyph_connections[k].targetId).parent().text().trim();
					console.log(in_name);
					var in_parent_id = $('#' + glyph_connections[k].targetId).parent().parent().parent().attr('id').split('_')[1];
					console.log(in_parent_id);
					str_nodes += 'NodeConnection:data:' + glyph_id + ':' + out_name + ':' + in_parent_id + ':' + in_name + '\n';
				}
				// END .wksp Connections
			}
		}
		str_nodes += '\n';
		str_wksp += '\n\n';
	}
	// END .wksp Glyphs

	str_wksp += str_nodes;

	// .wksp footer
	str_wksp += 'AnnotationsBegin\n';
	str_wksp += '\n';
	str_wksp += 'AnnotationsEnd\n';
	str_wksp += '\n';
	str_wksp += 'WorkspaceEnd: 2.1\n';
	// END .wksp footer

	// SaveZip
	var zip = new JSZip();
	zip.file(user_name + ".wksp", str_wksp);
	var img = zip.folder("images");
	var content = zip.generate({
		type: "blob"
	});

	// see FileSaver.js
	saveAs(content, file_name + ".zip");

	return str_wksp;
}

// Import from .wksp
function workspace_import_wksp(wksp) {

	// Clear the container
	$(CONTAINER_ID).empty();

	var glyph_connections = [];
	glyph_count = 0;
	console.log(wksp);
	var wksp_lines = wksp.split('\n');
	console.log(wksp_lines);
	console.log(wksp_lines.length);
	var glyph_lib = $('#librarycontainer').find('.lglyph');
	for (var l = 0; l < wksp_lines.length; l++) {
		console.log('wksp_lines[' + l + ']');
		if (wksp_lines[l].substring(0, 5) == 'Glyph') {
			console.log(wksp_lines[l].substring(0, 5));
			var wksp_lines_glyphs = wksp_lines[l].split(':');
			console.log('Function: ' + wksp_lines_glyphs[2]);
			console.log('ID: ' + wksp_lines_glyphs[5]);
			console.log('X: ' + wksp_lines_glyphs[6]);
			console.log('Y: ' + wksp_lines_glyphs[7]);

			if (glyph_count < wksp_lines_glyphs[5]) {
				glyph_count = wksp_lines_glyphs[5];
			}

			var idn = 'Glyph_' + wksp_lines_glyphs[5],
				idt = '#' + idn;

			var glyph;

			for (var y = 0; y < glyph_lib.length; y++) {
				var glyph_title = (($(glyph_lib[y]).find('.ui-widget-header').text()).toLowerCase());
				if (glyph_title == (wksp_lines_glyphs[2].toLowerCase().split('_')).join(' ')) {
					glyph = $(glyph_lib[y]).clone();
					console.log(glyph);
					break;
				}
			}

			//var glyph = $($('#librarycontainer').find('.lglyph')[0]).clone();
			glyph.css({
				left: wksp_lines_glyphs[6] + 'px',
				top: wksp_lines_glyphs[7] + 'px'
			}).attr('id', idn).removeClass('ui-draggable ui-draggable-handle selected lglyph').addClass('glyph');

			// Change output id
			var exit = glyph.children('.ui-widget-content').children('p').children('.vertex.out');
			for (i = 0; i < exit.length; i++) {

				//Vertex ID
				var vid = idn + '_vout_' + i;

				if ($(exit[i]).hasClass('image')) {
					vid = vid + 'image';
					$(exit[i]).attr('id', vid);
					jsPlumb.makeSource($(exit[i]), {
						scope: 'image',
					});
				} else if ($(exit[i]).hasClass('int')) {
					vid = vid + 'int';
					$(exit[i]).attr('id', vid);
					jsPlumb.makeSource($(exit[i]), {
						scope: 'int'
					});
				} else if ($(exit[i]).hasClass('float')) {
					vid = vid + 'float';
					$(exit[i]).attr('id', vid);
					jsPlumb.makeSource($(exit[i]), {
						scope: 'float'
					});
				} else {
					vid = vid + 'char';
					$(exit[i]).attr('id', vid);
					jsPlumb.makeSource($(exit[i]), {
						scope: 'char'
					});
				}
			}

			// Change input id
			var vin2 = glyph.children('.ui-widget-content').children('p').children('.vertex.in');
			for (i = 0; i < vin2.length; i++) {

				//Vertex ID
				var vid = idn + '_vin_' + i;

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

			if ($(glyph).find('.btn').length > 0) {
				$(glyph).find('.btn').attr('disabled', false);
				grid_xyz[('grid_' + wksp_lines_glyphs[5])] = {
					x: 3,
					y: 3,
					z: 3
				};
			}


			glyph.children('.ui-widget-header').append("<i></i>");
			glyph.children('.ui-widget-header').children('span').addClass("ui-icon ui-icon-gear glyphoptions");

			glyph.appendTo($(CONTAINER_ID)); // Append glyph to container
			console.log(glyph);
			add_select();
			jsPlumb.draggable($(idt), DRAG_OPTIONS); // Add drag to glyph
			addtoolbar();
			change_input_value();
			open_cwpopup();
			config.grid.name = 'grid_' + wksp_lines_glyphs[5];
			$('#grid_' + wksp_lines_glyphs[5]).w2grid(config.grid);

		} else if (wksp_lines[l].substring(0, 14) == 'NodeConnection') {
			// Connections
			console.log(wksp_lines[l].substring(0, 14));
			var wksp_lines_nc = wksp_lines[l].split(':');
			console.log('Out ID: ' + wksp_lines_nc[2]);
			console.log('Out var:  ' + wksp_lines_nc[3]);
			console.log('In ID: ' + wksp_lines_nc[4]);
			console.log('In var: ' + wksp_lines_nc[5]);
			glyph_connections.push({
				'out_id': wksp_lines_nc[2],
				'out_var': wksp_lines_nc[3],
				'in_id': wksp_lines_nc[4],
				'in_var': wksp_lines_nc[5]
			});
			console.log(glyph_connections);
		}

	}
	for (var o = 0; o < glyph_connections.length; o++) {
		var conn = {};
		var temp, idsource, idtarget;
		temp = $('#Glyph_' + glyph_connections[o].out_id).find('p');
		console.log('Temp:', temp);
		for (var m = 0; m < temp.length; m++) {
			console.log('ST1' + $(temp[m]).text().trim());
			console.log('ST2' + glyph_connections[o].out_var);
			if ($(temp[m]).text().trim() == glyph_connections[o].out_var) {
				conn.source = $($(temp[m]).children('span')).attr('id');
				break;
			}
		}
		temp = $('#Glyph_' + glyph_connections[o].in_id).find('p');
		for (var m = 0; m < temp.length; m++) {
			if ($(temp[m]).text().trim() == glyph_connections[o].in_var) {
				conn.target = $($(temp[m]).children('span')).attr('id');
				break;
			}
		}
		console.log(conn);
		jsPlumb.connect(conn);
	}
	return true;
}

// New Workspace
function workspace_new() {
	if (confirm('Your changes will be lost if start a new project without saving!!!')) {
		console.log("Reloading page!!!");
		location.reload();
	} else {
		console.log("New workspace canceled!!!");
	}
}

// Load Workspace
function workspace_load() {
	if (confirm('Your changes will be lost if you open a project without saving!!!')) {
		console.log("Saving file!!!");
		var load = prompt("Please enter the JSON file", "String");

		// Clear the container
		$(CONTAINER_ID).empty();

		// Appent the data to container
		$(CONTAINER_ID).append(load);

		// Add select to glyphs
		add_select();

		// Add drag to glyph
		jsPlumb.draggable($(DRAG_OBJECT), DRAG_OPTIONS);

		// Add the glyphs's toolbar
		addtoolbar();

		// Set Source & Target
		set_sourceANDtarget();

		// Change input value
		change_input_value();

	} else {
		console.log("Open canceled!!!");
	}
}

// Save Workspace
function workspace_save() {

	// Save Connections
	var connections = jsPlumb.getAllConnections();
	var connections_clear = [];
	for (var i = 0; i < connections.length; i++) {
		connections_clear.push({
			source: connections[i].sourceId,
			target: connections[i].targetId
		});
	}

	// Clear Selected and Connections
	deselectglyph();
	jsPlumb.detachEveryConnection();

	// Remove drag classes
	var glyphs = $(CONTAINER_ID).children(DRAG_OBJECT);
	for (var i = 0; i < glyphs.length; i++) {
		$(glyphs[i]).removeClass('ui-draggable ui-draggable-handle');
		console.log(glyphs[i]);
	}

	var save_file = {
		glyph_count: glyph_count,
		connections: connections_clear
	};

	save_file.workspace = document.getElementById('workspace').innerHTML;
	save_file.custom = document.getElementById('tabs-custom').innerHTML;
	console.log('Save File: ', save_file);
	console.log('Save File: ', JSON.stringify(save_file));

	try {
		var blob = new Blob([text], {
			type: "text/plain;charset=utf-8"
		});
		saveAs(blob, save_file);
	} catch (e) {
		console.log("saveAs not supported!!! Error: ", e);
	}

	// Restore connections
	for (var i = 0; i < connections_clear.length; i++) {
		jsPlumb.connect(connections_clear[i]);
	}

	return JSON.stringify(save_file);
}

// Add select
function add_select() {
	$(CONTAINER_ID + " .ui-widget-header").click(selectglyph);
	$(CONTAINER_ID + " .ui-widget-content").click(selectglyph);
}
