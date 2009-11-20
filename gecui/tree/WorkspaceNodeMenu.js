/**
 * @constructor
 */
gecui.tree.WorkspaceNodeMenu = function(config) {
    var failure = function(response) {
        Ext.Msg.alert('Status', response.responseText);
    };

    var addDataSource = function() {
        Ext.Ajax.request( {
            method : 'POST',
            url : this.node.attributes.resturl,
            failure : failure
        });
    };

    var deleteWorkspace = function() {
        Ext.Ajax.request( {
            method : 'DELETE',
            url : this.node.attributes.resturl,
            scope : this,
            failure : failure,
            success : function() {
                this.node.remove();
            }
        });
    };

    gecui.tree.WorkspaceNodeMenu.superclass.constructor.call(this, Ext.apply( {
        items : [ {
            text : 'Create DataStore',
            iconCls : 'gecui-datastore-create',
            handler : addDataSource,
            scope : this
        }, '-', {
            text : 'Delete',
            iconCls : 'gecui-workspace-delete',
            handler : deleteWorkspace,
            scope : this
        } ]
    }, config));
};

Ext.extend(gecui.tree.WorkspaceNodeMenu, Ext.menu.Menu);

Ext.reg('gecui-workspacenodemenu', gecui.tree.WorkspaceNodeMenu);
