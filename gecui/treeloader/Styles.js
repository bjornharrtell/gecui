/**
 * @constructor
 */
gecui.treeloader.Styles = function(config) {
    gecui.treeloader.Styles.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.treeloader.Styles, gecui.TreeLoader, {
    createNode : function(attr) {
        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-style';
        attr.iconCls = attr.xtype;
        attr.leaf = true;
        return gecui.TreeLoader.prototype.createNode.call(this, attr);
    }
});
