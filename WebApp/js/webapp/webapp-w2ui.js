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

//Convolution Window
var config = {
    layout: {
        name: 'layout',
        padding: 4,
        panels: [
            {
                type: 'left',
                size: '50%',
                resizable: true,
                minSize: 300
            },
            {
                type: 'top',
                size: '220px'
            },
            {
                type: 'main',
                minSize: 300
            }
        ]
    },
    grid: {
        header: 'Width x Height',
        show: {
            header: true,
            columnHeaders: true,
            toolbar: true,
            toolbarSave: true,
            toolbarSearch: false,
            toolbarColumns: false
        },
        name: 'grid',
        columns: [
            {
                field: 'recid',
                caption: 'ID',
                size: '50px',
                sortable: true,
                attr: 'align=center'
            },
            {
                field: 'lname',
                caption: 'Last Name',
                size: '30%',
                sortable: true,
                editable: {
                    type: 'text'
                }
            },
            {
                field: 'fname',
                caption: 'First Name',
                size: '30%',
                sortable: true
            },
            {
                field: 'email',
                caption: 'Email',
                size: '40%'
            },
            {
                field: 'sdate',
                caption: 'Start Date',
                size: '120px'
            },
        ],
        records: [
            {
                recid: 1,
                fname: 'John',
                lname: 'doe',
                email: 'jdoe@gmail.com',
                sdate: '4/3/2012'
            },
            {
                recid: 2,
                fname: 'Stuart',
                lname: 'Motzart',
                email: 'motzart@hotmail.com',
                sdate: '4/3/2012'
            },
            {
                recid: 3,
                fname: 'Jin',
                lname: 'Franson',
                email: 'jin@yahoo.com',
                sdate: '4/3/2012'
            },
            {
                recid: 4,
                fname: 'Susan',
                lname: 'Ottie',
                email: 'sottie@yahoo.com',
                sdate: '4/3/2012'
            },
            {
                recid: 5,
                fname: 'Kelly',
                lname: 'Silver',
                email: 'kelly@gmail.com',
                sdate: '4/3/2012'
            },
            {
                recid: 6,
                fname: 'Francis',
                lname: 'Gatos',
                email: 'frank@apple.com',
                sdate: '4/3/2012'
            }
        ],
        onClick: function (event) {
            w2ui['grid2'].clear();
            var record = this.get(event.recid);
            w2ui['grid2'].add([
                {
                    recid: 0,
                    name: 'ID:',
                    value: record.recid
                },
                {
                    recid: 1,
                    name: 'First Name:',
                    value: record.fname
                },
                {
                    recid: 2,
                    name: 'Last Name:',
                    value: record.lname
                },
                {
                    recid: 3,
                    name: 'Email:',
                    value: record.email
                },
                {
                    recid: 4,
                    name: 'Date:',
                    value: record.sdate
                }
            ]);
        }
    },
    form: {
        header: 'Edit Dimensions',
        name: 'form',
        fields: [
            {
                name: 'width',
                type: 'text',
                required: true,
                html: {
                    caption: 'Width',
                    attr: 'size="10"'
                }
            },
            {
                name: 'height',
                type: 'text',
                required: true,
                html: {
                    caption: 'Height',
                    attr: 'size="10" maxlength="40"'
                }
            },
            {
                name: 'depth',
                type: 'text',
                html: {
                    caption: 'Depth',
                    attr: 'size="10" maxlength="40"'
                }
            }
        ],
        actions: {
            Save: function () {
                var errors = this.validate();
                if (errors.length > 0) return;
                if (this.recid == 0) {
                    w2ui.grid.add($.extend(true, {
                        recid: w2ui.grid.records.length + 1
                    }, this.record));
                    w2ui.grid.selectNone();
                    this.clear();
                } else {
                    w2ui.grid.set(this.recid, this.record);
                    w2ui.grid.selectNone();
                    this.clear();
                }
            }
        }
    }
}

var config2 = {
    grid: {
        header: 'Depth',
        show: {
            header: true,
            columnHeaders: true
        },
        name: 'grid2',
        columns: [
            {
                field: 'name',
                caption: 'Name',
                size: '100px',
                style: 'background-color: #efefef; border-bottom: 1px solid white; padding-right: 5px;',
                attr: "align=right"
            },
            {
                field: 'value',
                caption: 'Value',
                size: '100%'
            }
        ]
    }
}

$(function () {
    // initialization in memory
    $().w2layout(config.layout);
    $().w2grid(config.grid);
    $().w2form(config.form);
    $().w2grid(config2.grid);
});

function cwPopup() {
    w2popup.open({
        title: 'Concolution Window',
        width: 900,
        height: 900,
        showMax: true,
        body: '<div id="main" style="position: absolute; left: 5px; top: 5px; right: 5px; bottom: 5px;"></div>',
        onOpen: function (event) {
            event.onComplete = function () {
                $('#w2ui-popup #main').w2render('layout');
                w2ui.layout.content('left', w2ui.grid);
                w2ui.layout.content('top', w2ui.form);
                w2ui.layout.content('main', w2ui.grid2);
            };
        },
        onToggle: function (event) {
            event.onComplete = function () {
                w2ui.layout.resize();
            }
        }
    });
}