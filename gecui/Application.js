/**
 * @constructor
 */
gecui.Application = function() {

	gecui.url = '/geoserver/rest/';

	var resourceFormPanel = new gecui.ResourceFormPanel( {
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
				Ext.Ajax.request({
					method: 'DELETE',
					url: node.attributes.id,
					failure: failure
				});
			};
			
			var menu = new Ext.menu.Menu( {
				items : [ {
					text : 'Delete',
					iconCls: 'gecui-delete',
					handler: deleteFeatureType
				} ]
			});
			menu.showAt(e.getXY());
		}
	};

	var onClick = function(node, e) {
		resourceFormPanel.setResourceFromNode(node);
	};

	
	var workspacesNode = new Ext.tree.TreeNode( {
		text : 'Workspaces',
		expanded : true,
		iconCls : 'gecui-workspaces'
	});
	var layersNode = new Ext.tree.TreeNode( {
		text : 'Layers',
		expanded : false,
		iconCls : 'gecui-layers'
	});
	var stylesNode = new Ext.tree.TreeNode( {
		text : 'Styles',
		expanded : false,
		iconCls : 'gecui-styles'
	});
	var root = new Ext.tree.TreeNode( {
		text : 'Geoserver',
		expanded : true
	});

	root.appendChild( [ workspacesNode, layersNode, stylesNode ]);

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

	// TODO: Use Ext Js TreeLoader implementation directly on suitable REST API
	new gecui.TreeLoader(workspacesNode, layersNode, stylesNode);
};

Ext.onReady(gecui.Application);
