/**
 * @constructor
 * @param name
 *            workspace name
 */
gecui.tree.WorkspaceNode = function(attr) {
	gecui.tree.WorkspaceNode.superclass.constructor.call(this, Ext.apply( {
		listeners : {
			contextmenu : {
				fn : this.onContextmenu
			}
		}
	}, attr));

	Ext.Ajax.request( {
		url : attr.id,
		scope: this,
		success : this.parseWorkspace
	});
};

Ext.extend(gecui.tree.WorkspaceNode, Ext.tree.TreeNode, {
	onContextmenu: function(node, e) {
		var menu = new Ext.menu.Menu( {
			items : [ {
				text : 'Add DataStore'
			}, '-', {
				text : 'Delete'
			} ]
		});
		menu.showAt(e.getXY());
	},
	parseWorkspace: function(response) {
		workspace = Ext.decode(response.responseText).workspace;

		this.setText(workspace.name);

		Ext.Ajax.request( {
			url : workspace.dataStores,
			scope: this,
			success : this.parseDataStores
		});
	},
	parseDataStores: function(response) {
		var dataStores = Ext.decode(response.responseText).dataStores.dataStore;

		if (!dataStores) {
			return;
		}

		for ( var i = 0; i < dataStores.length; i++) {
			this.appendChild(new gecui.tree.DataStoreNode({id: dataStores[i].href, text: dataStores[i].name}));
		}
	}
});

// this is to support future TreeLoader support 
Ext.tree.TreePanel.nodeTypes.geoserverWorkspace = gecui.tree.WorkspaceNode;
