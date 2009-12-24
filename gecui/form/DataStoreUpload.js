/**
 * Form panel for a Workspace
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.DataStoreUpload = function(config) {
    var workspaceName = config.workspaceName;
    
    gecui.form.DataStoreUpload.superclass.constructor.call(this, Ext.apply( {
        frame : true,
        method: 'PUT',
        url: gecui.url + 'workspaces/' + workspaceName + '/datastores/tesst/test.zip',
        fileUpload: true,
        defaultType : 'textfield',
        bodyStyle : 'padding:5px 5px 0;',
        items : [{
            name : 'file',
            xtype : 'fileuploadfield',
            fieldLabel : 'Zip archive',
            anchor : '95%'
        } ],
        buttons : [ {
            text : 'Save',
            formBind : true,
            scope : this,
            handler : function() {
                this.getForm().submit();
            }
        } ]
    }, config));
};

Ext.extend(gecui.form.DataStoreUpload, Ext.form.FormPanel);

Ext.reg('gecui-datastoreuploadform', gecui.form.DataStoreUpload);
