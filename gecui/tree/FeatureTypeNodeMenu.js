/**
 * @constructor
 */
gecui.tree.FeatureTypeNodeMenu = function(config) {
    var failure = function(response) {
        Ext.Msg.alert('Status', response.responseText);
    };

    var deleteFeatureType = function() {
        Ext.Ajax.request( {
            method : 'DELETE',
            url : this.node.attributes.resturl,
            failure : failure
        });
    };

    gecui.tree.FeatureTypeNodeMenu.superclass.constructor.call(this, Ext.apply( {
        items : [ {
            text : 'Delete',
            iconCls : 'gecui-delete',
            handler : deleteFeatureType,
            scope : this
        } ]
    }, config));
};

Ext.extend(gecui.tree.FeatureTypeNodeMenu, Ext.menu.Menu);

Ext.reg('gecui-featuretypenodemenu', gecui.tree.FeatureTypeNodeMenu);
