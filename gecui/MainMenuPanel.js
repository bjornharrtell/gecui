/**
 * @constructor
 */
gecui.MainMenuPanel = function(config) {

	var root = new Ext.tree.TreeNode( {
		text : 'Geoserver'
	});

	var workspacesNode = new gecui.tree.WorkspacesNode( {
		expanded : true
	});
	
	var layersNode = new gecui.tree.LayersNode( {
		expanded : true
	});

	root.appendChild( [ workspacesNode, layersNode ]);
	
	// TODO: Perhaps suggest adding a TreeLoader resource to Geoserver REST API...
	var tree = new Ext.tree.TreePanel( {
		root : root,
		rootVisible : false,
		border : false
	});
	
	var items = [ tree ];

	gecui.MainMenuPanel.superclass.constructor.call(this, Ext.apply( {
		border : false,
		items : items
	}, config));
};

Ext.extend(gecui.MainMenuPanel, Ext.Panel);

Ext.reg('gecui-mainmenu', gecui.MainMenuPanel);
