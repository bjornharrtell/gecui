/**
 * @constructor
 */
gecui.node.Styles = function(config) {
    gecui.node.Styles.superclass.constructor.call(this, Ext.apply( {
        text : 'Styles',
        expanded : false,
        xtype: 'gecui-styles',
        iconCls : 'gecui-styles',
        id : 'styles',
        loader : new gecui.treeloader.Styles({
            url : gecui.url,
            restful : true
        })
    }, config));
};

Ext.extend(gecui.node.Styles, Ext.tree.AsyncTreeNode, {});
