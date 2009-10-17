/**
 * Node that will populate itself from Geoserver REST API
 * @constructor
 */
gecui.tree.WorkspacesNode = function(config) {
	// TODO: actually do something
	
	gecui.tree.WorkspacesNode.superclass.constructor.call(this, Ext.apply( {
		text: 'Workspaces'
	}, config));
};

Ext.extend(gecui.tree.WorkspacesNode, Ext.tree.TreeNode);
