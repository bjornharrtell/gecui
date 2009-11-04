/**
 * Form panel for a Layer
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.LayerFormPanel = function(config) {
    var reader = new gecui.data.ResourceReader('layer');

    var submit = function() {
        var data = reader.applyFormValues(this.getForm());

        Ext.Ajax.request( {
            method : 'PUT',
            url : gecui.url + 'layers/' + data.layer.name,
            jsonData : data
        });
    };

    gecui.form.LayerFormPanel.superclass.constructor.call(this, Ext.apply( {
        frame : true,
        layout : 'fit',
        bodyStyle : 'padding:5px 5px 0;',
        items : [ {
            layout : 'border',
            items : [ {
                layout : 'form',
                region : 'center',
                defaultType : 'textfield',
                defaults : {
                    anchor : '95%'
                },
                items : [ {
                    name : 'path',
                    fieldLabel : 'Path'
                }, {
                    name : 'styles',
                    xtype : 'gecui-form-stylesfield',
                    fieldLabel : 'Styles'
                } ]
            }, {
                region : 'east',
                layout : 'fit',
                split : true,
                // collapsed: true,
                collapseMode : 'mini',
                collapsible : true,
                width : 200,
                items : [ {
                    xtype : 'gx_mappanel',

                    tbar : [ '-' ]
                } ]
            } ]
        } ],
        buttons : [ {
            text : 'Save',
            formBind : true,
            scope : this,
            handler : submit
        } ],
        reader : reader
    }, config));
};

Ext.extend(gecui.form.LayerFormPanel, Ext.form.FormPanel);

Ext.reg('gecui-form-layer', gecui.form.LayerFormPanel);
