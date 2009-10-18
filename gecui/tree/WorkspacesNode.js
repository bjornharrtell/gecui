/**
 * @constructor
 */
gecui.tree.WorkspacesNode = function(config) {
	var self = this;

	gecui.tree.WorkspacesNode.superclass.constructor.call(this, Ext.apply( {
		text : 'Workspaces'
	}, config));

	var success = function(response) {
		var workspaces = Ext.decode(response.responseText).workspaces.workspace;

		for ( var i = 0; i < workspaces.length; i++) {
			var workspace = workspaces[i];
			self.appendChild(new gecui.tree.WorkspaceNode(workspace.href));
		}
	};

	Ext.Ajax.request( {
		url : gecui.url + 'workspaces.json',
		success : success
	});
};

Ext.extend(gecui.tree.WorkspacesNode, Ext.tree.TreeNode);
