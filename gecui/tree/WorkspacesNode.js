/**
 * @constructor
 */
gecui.tree.WorkspacesNode = function(config) {
    var workspaceNodeLoader = new gecui.tree.TreeLoader( {
        url : gecui.url,
        restful : true,
        applyLoader : false
    });
    workspaceNodeLoader.createNode = function(attr) {
        var workspaceName = attr.name;

        var dataStoreNodeLoader = new gecui.tree.TreeLoader( {
            url : gecui.url,
            restful : true,
            applyLoader : false
        });
        dataStoreNodeLoader.createNode = function(attr) {
            var featureTypeNodeLoader = new gecui.tree.TreeLoader( {
                url : gecui.url,
                restful : true
            });
            featureTypeNodeLoader.createNode = function(attr) {
                attr.text = attr.name;
                attr.resturl = attr.href;
                delete attr.href;
                attr.xtype = 'gecui-form-featuretype';
                attr.iconCls = 'gecui-featuretype';
                attr.leaf = true;
                return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
            };

            attr.text = attr.name;
            attr.resturl = attr.href;
            delete attr.href;
            attr.xtype = 'gecui-form-datastore';
            attr.iconCls = 'gecui-datastore';
            attr.id = 'workspaces/' + workspaceName + '/datastores/' + attr.name + '/featuretypes';
            attr.loader = featureTypeNodeLoader;
            return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
        };

        attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.id = 'workspaces/' + attr.name + '/datastores';
        attr.xtype = 'gecui-form-workspace';
        attr.iconCls = 'gecui-workspace';
        attr.loader = dataStoreNodeLoader;
        return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
    };
    
    gecui.tree.WorkspacesNode.superclass.constructor.call(this, Ext.apply( {
        loader : workspaceNodeLoader,
        text : 'Workspaces',
        iconCls : 'gecui-workspaces',
        id : 'workspaces',
        expanded : true
    }, config));
};

Ext.extend(gecui.tree.WorkspacesNode, Ext.tree.AsyncTreeNode);
