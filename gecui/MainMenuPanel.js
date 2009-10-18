/**
 * @constructor
 */
gecui.MainMenuPanel = function(config) {

	var root = new Ext.tree.TreeNode( {
		text : 'Geoserver'
	});

	var tree = new Ext.tree.TreePanel( {
		root : root,
		rootVisible : false,
		border : false
	});

	var serverNode = new Ext.tree.TreeNode( {
		text : 'Server'
	});

	var servicesNode = new Ext.tree.TreeNode( {
		text : 'Services'
	});

	var workspacesNode = new gecui.tree.WorkspacesNode( {
		expanded : true
	});

	root.appendChild( [ serverNode, servicesNode, workspacesNode ]);

	var items = [ tree ];

	gecui.MainMenuPanel.superclass.constructor.call(this, Ext.apply( {
		border : false,
		items : items
	}, config));
};

Ext.extend(gecui.MainMenuPanel, Ext.Panel);

Ext.reg('gecui-mainmenu', gecui.MainMenuPanel);
