/**
 * @constructor
 */
gecui.menu.WorkspaceNodeMenu = function(config) {
    gecui.menu.WorkspaceNodeMenu.superclass.constructor.call(this, Ext.apply( {
        items : [ {
            text : 'Create DataStore',
            iconCls : 'gecui-datastore-create',
            handler : this.addDataSource,
            scope : this
        }, '-', {
            text : 'Delete',
            iconCls : 'gecui-workspace-delete',
            handler : this.deleteWorkspace,
            scope : this
        } ]
    }, config));
};

Ext.extend(gecui.menu.WorkspaceNodeMenu, Ext.menu.Menu, {
    addDataSource : function() {
        Ext.Ajax.request( {
            method : 'POST',
            url : this.node.attributes.resturl,
            failure : gecui.util.failure
        });
    },
    deleteWorkspace : function() {
        Ext.Ajax.request( {
            method : 'DELETE',
            url : this.node.attributes.resturl,
            scope : this,
            failure : gecui.util.failure,
            success : function() {
                this.node.remove();
            }
        });
    }
});

Ext.reg('gecui-workspacenodemenu', gecui.menu.WorkspaceNodeMenu);
