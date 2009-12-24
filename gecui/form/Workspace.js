/**
 * Form panel for a Workspace
 * 
 * @constructor
 */
gecui.form.Workspace = function(config) {
    gecui.form.Workspace.superclass.constructor.call(this, Ext.apply( {
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
            handler : this.createWorkspace
        } ],
        reader : new gecui.data.ResourceReader('workspace')
    }, config));
};

Ext.extend(gecui.form.Workspace, Ext.form.FormPanel, {
    createWorkspace: function() {
        Ext.Ajax.request( {
            method : 'POST',
            url : gecui.url + 'workspaces',
            jsonData : {
                "workspace" : {
                    "name" : this.getForm().findField('name').getValue()
                }
            },
            scope : this,
            success: function() {
                this.node.reload();
            },
            failure : gecui.util.failure
        });
    }
});

Ext.reg('gecui-workspaceform', gecui.form.Workspace);
