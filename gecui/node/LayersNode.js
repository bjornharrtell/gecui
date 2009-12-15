/**
 * @constructor
 */
gecui.node.LayersNode = function(config) {
    gecui.node.LayersNode.superclass.constructor.call(this, Ext.apply( {
        text : 'Layers',
        expanded : false,
        iconCls : 'gecui-layers',
        id : 'layers',
        loader : new gecui.treeloader.LayersTreeLoader({
            url : gecui.url,
            restful : true
        })
    }, config));
};

Ext.extend(gecui.node.LayersNode, Ext.tree.AsyncTreeNode, {});
