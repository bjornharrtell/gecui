/**
 * @constructor
 */
gecui.menu.FeatureType = function(config) {
    gecui.menu.FeatureType.superclass.constructor.call(this, Ext.apply( {
        items : [ {
            text : 'Delete',
            iconCls : 'gecui-delete',
            handler : this.deleteFeatureType,
            scope : this
        } ]
    }, config));
};

Ext.extend(gecui.menu.FeatureType, Ext.menu.Menu, {
    deleteFeatureType : function() {
        Ext.Ajax.request( {
            method : 'DELETE',
            url : this.node.attributes.resturl,
            failure : gecui.util.failure
        });
    }
});

Ext.reg('gecui-featuretypemenu', gecui.menu.FeatureType);
