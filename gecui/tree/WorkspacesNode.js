/**
 * Node that will populate itself from Geoserver REST API
 * 
 * @constructor
 */
gecui.tree.WorkspacesNode = function(config) {
	var self = this;

	gecui.tree.WorkspacesNode.superclass.constructor.call(this, Ext.apply( {
		text : 'Workspaces'
	}, config));

	var success = function(response) {
		var namespaces = Ext.decode(response.responseText).namespaces.namespace;

		for ( var i = 0; i < namespaces.length; i++) {
			var namespace = namespaces[i];
			self.appendChild(new gecui.tree.WorkspaceNode( {
				namespace : namespace
			}));
		}
	};

	Ext.Ajax.request( {
		url : '/geoserver/rest/namespaces.json',
		success : success
	});
};

Ext.extend(gecui.tree.WorkspacesNode, Ext.tree.TreeNode);
