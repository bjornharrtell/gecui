/**
 * @constructor
 */
gecui.node.Layers = function(config) {
    gecui.node.Layers.superclass.constructor.call(this, Ext.apply( {
        text : 'Layers',
        expanded : false,
        xtype: 'gecui-layers',
        iconCls : 'gecui-layers',
        id : 'layers',
        loader : new gecui.treeloader.Layers({
            url : gecui.url,
            restful : true
        })
    }, config));
};

Ext.extend(gecui.node.Layers, Ext.tree.AsyncTreeNode, {});
