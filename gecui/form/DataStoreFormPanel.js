/**
 * Form panel for a Workspace
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.DataStoreFormPanel = function(config) {
    gecui.form.DataStoreFormPanel.superclass.constructor.call(this, Ext.apply( {
        frame : true,
        defaultType : 'textfield',
        bodyStyle : 'padding:5px 5px 0;',
        items : [ {
            name : 'name',
            fieldLabel : 'Name',
            anchor : '95%'
        }, {
            name : 'onnectionparameters',
            xtype : 'gecui-connectionparametersfield',
            fieldLabel : 'Connection parameters',
            width: 300
        } ],
        buttons : [ {
            text : 'Save',
            formBind : true,
            scope : this,
            handler : function() {
                this.getForm().submit();
            }
        } ],
        reader : new gecui.data.ResourceReader('dataStore')
    }, config));
};

Ext.extend(gecui.form.DataStoreFormPanel, Ext.form.FormPanel);

Ext.reg('gecui-datastoreform', gecui.form.DataStoreFormPanel);
