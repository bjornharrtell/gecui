/**
 * @constructor
 * @param name
 *            workspace name
 */
gecui.tree.WorkspaceNode = function() {
	var href = arguments[0];

	var self = this;

	var config = {};

	var workspace = null;

	// TODO: this is just mockup atm
	var onContextmenu = function(node, e) {
		var menu = new Ext.menu.Menu( {
			items : [ {
				text : 'Add DataStore'
			}, '-', {
				text : 'Delete'
			} ]
		});
		menu.showAt(e.getXY());
	};

	gecui.tree.WorkspaceNode.superclass.constructor.call(this, Ext.apply( {
		listeners : {
			contextmenu : {
				fn : onContextmenu
			}
		}
	}, config));

	var parseDataStores = function(response) {
		var dataStores = Ext.decode(response.responseText).dataStores.dataStore;

		if (!dataStores) {
			return;
		}

		for ( var i = 0; i < dataStores.length; i++) {
			self.appendChild(new gecui.tree.DataStoreNode(dataStores[i].href));
		}
	};

	var parseWorkspace = function(response) {
		workspace = Ext.decode(response.responseText).workspace;

		self.setText(workspace.name);

		Ext.Ajax.request( {
			url : workspace.dataStores,
			success : parseDataStores
		});
	};

	Ext.Ajax.request( {
		url : href,
		success : parseWorkspace
	});

};

Ext.extend(gecui.tree.WorkspaceNode, Ext.tree.TreeNode);
