/**
 * @constructor
 */
gecui.tree.LayersNode = function(config) {
    var layerNodeLoader = new gecui.tree.TreeLoader( {
        url : gecui.url,
        restful : true
    });
    layerNodeLoader.createNode = function(attr) {
        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-form-layer';
        attr.iconCls = 'gecui-layer';
        attr.leaf = true;
        return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
    };
    
    gecui.tree.LayersNode.superclass.constructor.call(this, Ext.apply( {
        loader : layerNodeLoader,
        text : 'Layers',
        expanded : false,
        iconCls : 'gecui-layers',
        id : 'layers'
    }, config));
};

Ext.extend(gecui.tree.LayersNode, Ext.tree.AsyncTreeNode);
