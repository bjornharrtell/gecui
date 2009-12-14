/**
 * @constructor
 */
gecui.tree.WorkspacesNodeMenu = function(config) {
    gecui.tree.WorkspacesNodeMenu.superclass.constructor.call(this, Ext.apply( {
        items : [ {
            text : 'Create Workspace',
            iconCls : 'gecui-workspace-create',
            handler : this.createWorkspace,
            scope : this
        } ]
    }, config));
};

Ext.extend(gecui.tree.WorkspacesNodeMenu, Ext.menu.Menu, {
    createWorkspace : function() {
        var window = new Ext.Window( {
            title : 'Create Workspace',
            bodyStyle : 'background-color:white;',
            items : new gecui.form.WorkspaceFormPanel( {
                border : false,
                frame : false,
                node : this.node
            })
        });

        window.show();
    }
});

Ext.reg('gecui-workspacesnodemenu', gecui.tree.WorkspacesNodeMenu);
