/**
 * @constructor
 */
gecui.tree.StylesNode = function(config) {
    var styleNodeLoader = new gecui.tree.TreeLoader( {
        url : gecui.url,
        restful : true
    });
    styleNodeLoader.createNode = function(attr) {
        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-style';
        attr.iconCls = attr.xtype;
        attr.leaf = true;
        return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
    };
    
    gecui.tree.StylesNode.superclass.constructor.call(this, Ext.apply( {
        loader : styleNodeLoader,
        text : 'Styles',
        expanded : false,
        iconCls : 'gecui-styles',
        id : 'styles'
    }, config));
};

Ext.extend(gecui.tree.StylesNode, Ext.tree.AsyncTreeNode);
