"use strict";
// Return the Z column values
function zvalues(zn, yn) {
	var zvalue = [];
	for (var i = 0; i < zn; i++) {
		for (var j = 0; j < yn; j++) {
			zvalue.push(i);
		}
	}
	return zvalue;
}

// Return the Z column values
function yvalues(yn, zn) {
	var yvalue = [];
	for (var i = 0; i < zn; i++) {
		for (var j = 0; j < yn; j++) {
			yvalue.push(j);
		}
	}
	return yvalue;
}

// Add column
function add_column(grid, fname, ccaption, nrecords) {
	var colName = 'x' + fname + 'value';
	w2ui[grid].addColumn({
		field: colName,
		caption: ccaption,
		size: '50px',
		editable: {
			type: 'int'
		}
	});
	for (var i = 1; i <= nrecords; i++) {
		w2ui[grid].set(i,{[colName]:1});
	}
}

// Remove column
function rm_column(grid, cname) {
	w2ui[grid].removeColumn(cname);
}

// Change Z Y values
function change_zy(grid, z, y) {
	var zv = zvalues(z, y);
	var yv = yvalues(y, z);
	for (var i = 1; i <= z * y; i++) {
		w2ui[grid].set(i, {
			zvalue: zv[i - 1],
			yvalue: yv[i - 1]
		});
	}
}

//Convolution Window default config.
var config = {
	layout: {
		name: 'layout',
		padding: 4,
		panels: [{
			type: 'left',
			size: '250px'
		}, {
			type: 'main',
			minSize: 300
		}]
	},
	grid: {
		header: 'Convolution',
		show: {
			header: true,
			columnHeaders: true,
			toolbar: true,
			toolbarSave: true,
			toolbarSearch: false,
			toolbarColumns: false,
			lineNumbers: true
		},
		name: 'grid',
		columns: [{
			field: 'zvalue',
			caption: 'Z',
			size: '50px',
			sortable: false,
			attr: 'align=center'
		}, {
			field: 'yvalue',
			caption: 'Y',
			size: '50px',
			sortable: false,
			attr: 'align=center'
		}, {
			field: 'x0value',
			caption: '0',
			size: '50px',
			attr: 'align=center',
			editable: {
				type: 'float'
			}
		}, {
			field: 'x1value',
			caption: '1',
			size: '50px',
			attr: 'align=center',
			editable: {
				type: 'float'
			}
		}, {
			field: 'x2value',
			caption: '2',
			size: '50px',
			attr: 'align=center',
			editable: {
				type: 'float'
			}
		}],
		records: [{
			recid: 1,
			zvalue: 0,
			yvalue: 0,
			x0value: 1.0,
			x1value: 1.0,
			x2value: 1.0
		}, {
			recid: 2,
			zvalue: 0,
			yvalue: 1,
			x0value: 1.0,
			x1value: 1.0,
			x2value: 1.0
		}, {
			recid: 3,
			zvalue: 0,
			yvalue: 2,
			x0value: 1.0,
			x1value: 1.0,
			x2value: 1.0
		}, {
			recid: 4,
			zvalue: 1,
			yvalue: 0,
			x0value: 1.0,
			x1value: 1.0,
			x2value: 1.0
		}, {
			recid: 5,
			zvalue: 1,
			yvalue: 1,
			x0value: 1.0,
			x1value: 1.0,
			x2value: 1.0
		}, {
			recid: 6,
			zvalue: 1,
			yvalue: 2,
			x0value: 1.0,
			x1value: 1.0,
			x2value: 1.0
		}, {
			recid: 7,
			zvalue: 2,
			yvalue: 0,
			x0value: 1.0,
			x1value: 1.0,
			x2value: 1.0
		}, {
			recid: 8,
			zvalue: 2,
			yvalue: 1,
			x0value: 1.0,
			x1value: 1.0,
			x2value: 1.0
		}, {
			recid: 9,
			zvalue: 2,
			yvalue: 2,
			x0value: 1.0,
			x1value: 1.0,
			x2value: 1.0
		}]
	},
	form: {
		header: 'Edit Dimensions',
		name: 'form',
		fields: [{
			name: 'width',
			type: 'int',
			html: {
				caption: 'Width',
				attr: 'size="5"'
			},
			options: {
				min: 1
			}
		}, {
			name: 'height',
			type: 'int',
			html: {
				caption: 'Height',
				attr: 'size="5" value="5"'
			},
			options: {
				min: 1
			}
		}, {
			name: 'depth',
			type: 'int',
			html: {
				caption: 'Depth',
				attr: 'size="5"'
			},
			options: {
				min: 1
			}
		}],
		record: {
			width: 3,
			height: 3,
			depth: 3
		},
		actions: {
			Change: function() {

				// Change nº rows for height and depth
				if (w2ui[grid_id].records.length > this.record.depth * this.record.height) {
					console.log("i3= "+config.form.record.depth * config.form.record.height +" "+this.record.depth * this.record.height);
					for (var i3 = config.form.record.depth * config.form.record.height; i3 > this.record.depth * this.record.height; i3--) {
						console.log("RM record: "+i3);
						w2ui[grid_id].remove(i3-1);
					}

					// Change Z Y columns values
					change_zy(grid_id, this.record.depth, this.record.height);

				} else {
					for (var i4 = config.form.record.depth * config.form.record.height + 1; i4 <= this.record.depth * this.record.height; i4++) {

						w2ui[grid_id].add({
							recid: i4
						});
					}
				}

				// Change Z Y columns values
				change_zy(grid_id, this.record.depth, this.record.height);

				// Change nº cols for width
				if (w2ui[grid_id].columns.length - 2 < this.record.width) {
					// Add cols for width
					for (var i = w2ui[grid_id].columns.length - 2; i < this.record.width; i++) {
						add_column(grid_id, i, i, w2ui[grid_id].records.length);
					}
				} else {
					for (var i2 = w2ui[grid_id].columns.length - 2; i2 >= this.record.width; i2--) {
						var col = 'x' + (i2) + 'value';
						rm_column(grid_id, col);
					}
				}

				grid_xyz[grid_id].y = this.record.height;
				grid_xyz[grid_id].z = this.record.depth;
				grid_xyz[grid_id].x = this.record.width;

			}
		}
	}
};

// Conv. Window Popup
function cwPopup(grid) {
	w2popup.open({
		title: 'Concolution Window',
		width: 900,
		height: 500,
		showMax: true,
		body: '<div id="main" style="position: absolute; left: 5px; top: 5px; right: 5px; bottom: 5px;"></div>',
		onOpen: function(event) {
			event.onComplete = function() {
				$('#w2ui-popup #main').w2render('layout');
				w2ui.layout.content('left', w2ui.form);
				w2ui.layout.content('main', w2ui[grid]);
			};
		},
		onToggle: function(event) {
			event.onComplete = function() {
				w2ui.layout.resize();
			};
		}
	});
}

function init_w2ui() {
	// initialization in memory
	$().w2layout(config.layout);
	//$().w2grid(config.grid);
	$().w2form(config.form);
}

init_w2ui();

// Open CW popup
function open_cwpopup() {
	$('.btn').click(function(event) {
		var id = $(event.target.closest('.glyph')).attr('id').split('_')[1];
		grid_id = 'grid_' + id;
		console.log(grid_id);
		w2ui.form.record.height = grid_xyz[grid_id].y;
		w2ui.form.record.depth = grid_xyz[grid_id].z;
		w2ui.form.record.width = grid_xyz[grid_id].x;
		w2ui.form.refresh();
		cwPopup(grid_id);
	});
}
