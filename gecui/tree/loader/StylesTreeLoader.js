/**
 * @constructor
 */
gecui.tree.loader.StylesTreeLoader = function(config) {
    gecui.tree.loader.StylesTreeLoader.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.tree.loader.StylesTreeLoader, gecui.tree.TreeLoader, {
    createNode : function(attr) {
        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-style';
        attr.iconCls = attr.xtype;
        attr.leaf = true;
        return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
    }
});
