/**
 * @constructor
 */
gecui.node.StylesNode = function(config) {
    gecui.node.StylesNode.superclass.constructor.call(this, Ext.apply( {
        text : 'Styles',
        expanded : false,
        iconCls : 'gecui-styles',
        id : 'styles',
        loader : new gecui.tree.loader.StylesTreeLoader({
            url : gecui.url,
            restful : true
        })
    }, config));
};

Ext.extend(gecui.node.StylesNode, Ext.tree.AsyncTreeNode, {});
