/**
 * Form panel for a Workspace
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.DataStore = function(config) {
    gecui.form.DataStore.superclass.constructor.call(this, Ext.apply( {
        frame : true,
        defaultType : 'textfield',
        bodyStyle : 'padding:5px 5px 0;',
        items : [ {
            name : 'name',
            fieldLabel : 'Name',
            anchor : '95%'
        }, {
            name : 'connectionParameters',
            xtype : 'gecui-connectionparametersfield',
            fieldLabel : 'Connection parameters',
            anchor : '95%'
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

Ext.extend(gecui.form.DataStore, Ext.form.FormPanel);

Ext.reg('gecui-datastoreform', gecui.form.DataStore);
