/**
 * @constructor
 */
gecui.MenuPanel = function(config) {

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
	
	var dataNode = new Ext.tree.TreeNode( {
		text : 'Data'
	});

	var items = [serverNode, servicesNode, dataNode];

	gecui.MenuPanel.superclass.constructor.call(this, Ext.apply( {
		bodyStyle : 'padding:5px 5px 0',
		items : items
	}, config));
};

Ext.extend(gecui.MenuPanel, Ext.Panel);
