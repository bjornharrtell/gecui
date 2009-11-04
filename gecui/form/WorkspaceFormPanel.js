/**
 * Form panel for a Workspace
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.WorkspaceFormPanel = function(config) {
    gecui.form.WorkspaceFormPanel.superclass.constructor.call(this, Ext.apply( {
        frame : true,
        defaults : {
            anchor : '95%'
        },
        defaultType : 'textfield',
        bodyStyle : 'padding:5px 5px 0;',
        items : [ {
            name : 'name',
            fieldLabel : 'Name'
        } ],
        buttons : [ {
            text : 'Save',
            formBind : true,
            scope : this,
            handler : function() {
                this.getForm().submit();
            }
        } ],
        reader : new gecui.data.ResourceReader('workspace')
    }, config));
};

Ext.extend(gecui.form.WorkspaceFormPanel, Ext.form.FormPanel);

Ext.reg('gecui-form-workspace', gecui.form.WorkspaceFormPanel);
