/**
 * @constructor
 */
gecui.Application = function() {

	gecui.url = '/geoserver/rest/';

	var resourceFormPanel = new gecui.ResourceFormPanel( {
		region : 'center',
		margins : '3 3 3 0'
	});

	// TODO: refactor?
	var onContextmenu = function(node, e) {
		if (node.nodeType == 'geoserverFeatureType') {
			//
		}
	};

	var onClick = function(node, e) {
		resourceFormPanel.setResourceFromNode(node);
	};

	// TODO: TreeLoader implementation directly on suitable REST API

	var workspacesNode = new Ext.tree.TreeNode( {
		text : 'Workspaces',
		expanded : true
	});

	var layersNode = new Ext.tree.TreeNode( {
		text : 'Layers',
		expanded : true
	});
	
	var root = new Ext.tree.TreeNode( {
		text : 'Layers',
		expanded : true
	});
	
	root.appendChild([ workspacesNode, layersNode ]);

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
		}, resourceFormPanel]

	});

	new gecui.TreeLoader(workspacesNode, layersNode);
};

Ext.onReady(gecui.Application);
