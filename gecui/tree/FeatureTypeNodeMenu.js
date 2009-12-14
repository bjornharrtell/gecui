/**
 * @constructor
 */
gecui.tree.FeatureTypeNodeMenu = function(config) {
    gecui.tree.FeatureTypeNodeMenu.superclass.constructor.call(this, Ext.apply( {
        items : [ {
            text : 'Delete',
            iconCls : 'gecui-delete',
            handler : this.deleteFeatureType,
            scope : this
        } ]
    }, config));
};

Ext.extend(gecui.tree.FeatureTypeNodeMenu, Ext.menu.Menu, {
    deleteFeatureType : function() {
        Ext.Ajax.request( {
            method : 'DELETE',
            url : this.node.attributes.resturl,
            failure : gecui.failure
        });
    }
});

Ext.reg('gecui-featuretypenodemenu', gecui.tree.FeatureTypeNodeMenu);
