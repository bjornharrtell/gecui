/**
 * @constructor
 */
gecui.tree.WorkspacesNode = function(attr) {
	gecui.tree.WorkspacesNode.superclass.constructor.call(this, Ext.apply( {
		text : 'Workspaces'
	}, attr));

	Ext.Ajax.request( {
		url : gecui.url + 'workspaces.json',
		scope : this,
		success : this.parseWorkspaces
	});
};

Ext.extend(gecui.tree.WorkspacesNode, Ext.tree.TreeNode, {
	parseWorkspaces : function(response) {
		var workspaces = Ext.decode(response.responseText).workspaces.workspace;

		for ( var i = 0; i < workspaces.length; i++) {
			var workspace = workspaces[i];
			this.appendChild(new gecui.tree.WorkspaceNode( {
				id : workspace.href,
				text : workspace.name
			}));
		}
	}
});
