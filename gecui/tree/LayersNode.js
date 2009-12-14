/**
 * @constructor
 */
gecui.tree.LayersNode = function(config) {
    gecui.tree.LayersNode.superclass.constructor.call(this, Ext.apply( {
        text : 'Layers',
        expanded : false,
        iconCls : 'gecui-layers',
        id : 'layers'
    }, config));
};

Ext.extend(gecui.tree.LayersNode, Ext.tree.AsyncTreeNode, {
    loader : function() {
        var layerNodeLoader = new gecui.tree.TreeLoader( {
            url : gecui.url,
            restful : true
        });
        layerNodeLoader.createNode = function(attr) {
            attr.text = attr.name;
            attr.resturl = attr.href;
            delete attr.href;
            attr.xtype = 'gecui-layer';
            attr.iconCls = attr.xtype;
            attr.leaf = true;
            return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
        };
        return layerNodeLoader;
    }()
});
