/**
 * Form panel for a Workspace
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.WorkspaceFormPanel = function(config) {
    var reader = new gecui.data.ResourceReader('workspace');

    var submit = function() {
        var failure = function(response) {
            Ext.Msg.alert('Status', response.responseText);
        };

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
            failure : failure
        });
    };

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
            handler : submit
        } ],
        reader : reader
    }, config));
};

Ext.extend(gecui.form.WorkspaceFormPanel, Ext.form.FormPanel);

Ext.reg('gecui-workspaceform', gecui.form.WorkspaceFormPanel);
