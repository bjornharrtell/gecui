/**
 * @constructor
 */
gecui.Application = function() {

	var resourceFormPanel = new gecui.form.ResourceFormPanel( {
		region : 'center',
		margins : '3 3 3 0'
	});

	var onContextmenu = function(node, e) {
		// TODO: refactor into a base class for context menus
		if (node.attributes.iconCls == 'gecui-featuretype') {
			var failure = function(response) {
				Ext.Msg.alert('Status', response.responseText);
			};

			var deleteFeatureType = function() {
				Ext.Ajax.request( {
					method : 'DELETE',
					url : node.attributes.id,
					failure : failure
				});
			};

			var menu = new Ext.menu.Menu( {
				items : [ {
					text : 'Delete',
					iconCls : 'gecui-delete',
					handler : deleteFeatureType
				} ]
			});
			menu.showAt(e.getXY());
		}
	};

	var onClick = function(node, e) {
		resourceFormPanel.setResourceFromNode(node);
	};

	var root = new Ext.tree.TreeNode( {
		text : 'Geoserver',
		expanded : true
	});

	var workspaceNodeLoader = new gecui.tree.TreeLoader( {
		url : gecui.url,
		restful : true,
		applyLoader: false
	});
	workspaceNodeLoader.createNode = function(attr) {
		var workspaceName = attr.name;
		
		var dataStoreNodeLoader = new gecui.tree.TreeLoader( {
			url : gecui.url,
			restful : true,
			applyLoader: false
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
	
	var workspacesNode = new Ext.tree.AsyncTreeNode( {
		loader : workspaceNodeLoader,
		text : 'Workspaces',
		iconCls : 'gecui-workspaces',
		id : 'workspaces',
		expanded: true
	});

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
	
	var layersNode = new Ext.tree.AsyncTreeNode( {
		loader : layerNodeLoader,
		text : 'Layers',
		expanded : false,
		iconCls : 'gecui-layers',
		id : 'layers'
	});
	
	var styleNodeLoader = new gecui.tree.TreeLoader( {
		url : gecui.url,
		restful : true
	});
	styleNodeLoader.createNode = function(attr) {
		attr.text = attr.name;
        attr.resturl = attr.href;
        delete attr.href;
        attr.xtype = 'gecui-form-style';
        attr.iconCls = 'gecui-style';
        attr.leaf = true;
        return gecui.tree.TreeLoader.prototype.createNode.call(this, attr);
	};
	
	var stylesNode = new Ext.tree.AsyncTreeNode( {
		loader : styleNodeLoader,
		text : 'Styles',
		expanded : false,
		iconCls : 'gecui-styles',
		id : 'styles'
	});

	root.appendChild([workspacesNode, layersNode, stylesNode]);

	var viewport = new Ext.Viewport( {
		layout : 'border',
		items : [ {
			region : 'west',
			margins : '3 0 3 3',
			split : true,
			width : 200,
			autoScroll : true,
			xtype : 'treepanel',
			root : root,
			rootVisible : false,
			listeners : {
				click : {
					fn : onClick
				},
				contextmenu : {
					fn : onContextmenu
				}
			}
		}, resourceFormPanel ]

	});

};

Ext.onReady(gecui.Application);
