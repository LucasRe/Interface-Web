//Toolbar
$(function () {
    $('#toolbar').w2toolbar({
        name: 'toolbar',
        items: [
            {
                type: 'menu',
                id: 'item1',
                caption: 'Menu',
                items: [
                    {
                        text: 'Open',
                        icon: 'icon-page'
                    },
                    {
                        text: 'Save',
                        icon: 'icon-page'
                    }
  ]
            },
            {
                type: 'menu',
                id: 'item2',
                caption: 'Edit',
                items: [
                    {
                        text: 'Duplicate',
                        icon: 'icon-page'
                    },
                    {
                        text: 'Delete',
                        icon: 'icon-page'
                    }
  ]
            },
            {
                type: 'menu',
                id: 'item3',
                caption: 'Help',
                items: [
                    {
                        text: 'Documentation',
                        icon: 'icon-page'
                    },
                    {
                        text: 'About',
                        icon: 'icon-page'
                    }
  ]
            },
        ]
    });

    w2ui.toolbar.on('*', function (event) {
        console.log('EVENT: ' + event.type + ' TARGET: ' + event.target, event);
    });
});

// Conv. Window Popup
function cwPopup() {
    w2popup.open({
        title: 'Concolution Window',
        width: 900,
        height: 500,
        showMax: true,
        body: '<div id="main" style="position: absolute; left: 5px; top: 5px; right: 5px; bottom: 5px;"></div>',
        onOpen: function (event) {
            event.onComplete = function () {
                $('#w2ui-popup #main').w2render('layout');
                w2ui.layout.content('left', w2ui.form);
                w2ui.layout.content('main', w2ui.grid);
            };
        },
        onToggle: function (event) {
            event.onComplete = function () {
                w2ui.layout.resize();
            }
        }
    });
}

function zvalues(zn, yn) {
    var zvalue = [];
    for (i = 0; i < zn; i++) {
        for (j = 0; j < yn; j++) {
            zvalue.push(i);
        }
    }
    return zvalue;
}

function yvalues(yn, zn) {
    var yvalue = [];
    for (i = 0; i < zn; i++) {
        for (j = 0; j < yn; j++) {
            yvalue.push(j);
        }
    }
    return yvalue;
}

// Add column
function add_column(fname, ccaption) {
    w2ui['grid'].addColumn({
        field: 'x' + fname + 'value',
        caption: ccaption,
        size: '50px',
        editable: {
            type: 'int'
        }
    });
}

// Remove column
function rm_column(cname) {
    w2ui['grid'].removeColumn(cname);
}

// Change grid
function change_grid(x, y, z) {

}

//Convolution Window
var config = {
    layout: {
        name: 'layout',
        padding: 4,
        panels: [
            {
                type: 'left',
                size: '250px'
            },
            {
                type: 'main',
                minSize: 300
            }
        ]
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
        columns: [
            {
                field: 'zvalue',
                caption: 'Z',
                size: '50px',
                sortable: false,
                attr: 'align=center'
            },
            {
                field: 'yvalue',
                caption: 'Y',
                size: '50px',
                sortable: false,
                attr: 'align=center'
            },
            {
                field: 'x0value',
                caption: '0',
                size: '50px',
                attr: 'align=center',
                editable: {
                    type: 'int'
                }
            },
            {
                field: 'x1value',
                caption: '1',
                size: '50px',
                attr: 'align=center',
                editable: {
                    type: 'int'
                }
            },
            {
                field: 'x2value',
                caption: '2',
                size: '50px',
                attr: 'align=center',
                editable: {
                    type: 'int'
                }
            }
        ],
        records: [
            {
                recid: 1,
                zvalue: 0,
                yvalue: 0
            },
            {
                recid: 2,
                zvalue: 0,
                yvalue: 1
            },
            {
                recid: 3,
                zvalue: 0,
                yvalue: 2
            },
            {
                recid: 4,
                zvalue: 1,
                yvalue: 0
            },
            {
                recid: 5,
                zvalue: 1,
                yvalue: 1
            },
            {
                recid: 6,
                zvalue: 1,
                yvalue: 2
            },
            {
                recid: 7,
                zvalue: 2,
                yvalue: 0
            },
            {
                recid: 8,
                zvalue: 2,
                yvalue: 1
            },
            {
                recid: 9,
                zvalue: 2,
                yvalue: 2
            }
        ]
    },
    form: {
        header: 'Edit Dimensions',
        name: 'form',
        fields: [
            {
                name: 'width',
                type: 'int',
                html: {
                    caption: 'Width',
                    attr: 'size="5"'
                },
                options: {
                    min: 1
                }
            },
            {
                name: 'height',
                type: 'int',
                html: {
                    caption: 'Height',
                    attr: 'size="5" value="5"'
                },
                options: {
                    min: 1
                }
            },
            {
                name: 'depth',
                type: 'int',
                html: {
                    caption: 'Depth',
                    attr: 'size="5"'
                },
                options: {
                    min: 1
                }
            }
        ],
        record: {
            width: 3,
            height: 3,
            depth: 3
        },
        actions: {
            Change: function () {
                // Change nº cols for width
                if (config.form.record.width < this.record.width) {
                    // Add cols for width
                    for (i = config.form.record.width; i < this.record.width; i++) {
                        add_column(i, i);
                    }
                } else {
                    for (i = config.form.record.width; i >= this.record.width; i--) {
                        rm_column('x' + i + 'value');
                        config.grid.records.splice(i, 1);
                    }
                }
                config.form.record.width = this.record.width;

                // Change nº rows for height and depth
                if (w2ui['grid'].records.length > this.record.depth * this.record.height) {
                    for (i = config.form.record.depth * config.form.record.height; i > this.record.depth * this.record.height; i--) {
                        w2ui['grid'].remove(i);
                    }
                } else {
                    for (i = config.form.record.depth * config.form.record.height + 1; i <= this.record.depth * this.record.height; i++) {
                        w2ui['grid'].add({
                            recid: i
                        })
                    };
                }
                config.form.record.depth = this.record.depth;
                config.form.record.height = this.record.height;


            }
        }
    }
}

function init_grid(grid) {
    // initialization in memory
    $().w2layout(config.layout);
    $().w2grid(config.grid);
    $().w2form(config.form);
}

init_grid();