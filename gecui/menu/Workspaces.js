/**
 * @constructor
 */
gecui.menu.Workspaces = function(config) {
    gecui.menu.Workspaces.superclass.constructor.call(this, Ext.apply( {
        items : [ {
            text : 'Create Workspace',
            iconCls : 'gecui-workspace-create',
            handler : this.createWorkspace,
            scope : this
        } ]
    }, config));
};

Ext.extend(gecui.menu.Workspaces, Ext.menu.Menu, {
    createWorkspace : function() {
        var window = new Ext.Window( {
            title : 'Create Workspace',
            bodyStyle : 'background-color:white;',
            items : new gecui.form.Workspace( {
                border : false,
                frame : false,
                node : this.node
            })
        });

        window.show();
    }
});

Ext.reg('gecui-workspacesmenu', gecui.menu.Workspaces);
