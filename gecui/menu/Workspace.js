/**
 * @constructor
 */
gecui.menu.Workspace = function(config) {
    gecui.menu.Workspace.superclass.constructor.call(this, Ext.apply( {
        items : [ {
            text : 'Create DataStore',
            iconCls : 'gecui-datastore-create',
            handler : this.createDataStore,
            scope : this
        }, '-', {
            text : 'Delete',
            iconCls : 'gecui-workspace-delete',
            handler : this.deleteWorkspace,
            scope : this
        } ],
        windowDataStore: undefined
    }, config));
};

Ext.extend(gecui.menu.Workspace, Ext.menu.Menu, {
    windowDataStore: null,
    createDataStore : function() {
        if (this.windowDataStore === undefined) {
            this.windowDataStore = new Ext.Window( {
                title : 'Create DataStore',
                bodyStyle : 'background-color:white;',
                layout: 'fit',
                width: 400,
                height: 300,
                items : new gecui.form.DataStore( {
                    border : false,
                    frame : false,
                    node : this.node
                })
            });
        }
    
        this.windowDataStore.show();
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

Ext.reg('gecui-workspacemenu', gecui.menu.Workspace);
