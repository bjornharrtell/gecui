/**
 * Use the REST API to construct root node attribute configuration for a
 * TreePanel.
 * 
 * NOTE: This would probably be better to do serverside...
 * 
 * @constructor
 * @param callback
 */
gecui.TreeLoader = function(workspacesNode, layersNode, stylesNode) {

	var workspaceNodes = [];
	var layerNodes = [];
	var styleNodes = [];

	var requestCount = 0;

	var parseFeatureTypes = function(response) {
		var featureTypes = Ext.decode(response.responseText).featureTypes.featureType;

		for ( var i = 0; i < featureTypes.length; i++) {
			var featureType = featureTypes[i];

			this.children.push( {
				id : featureType.href,
				text : featureType.name,
				xtype : 'gecui-form-featuretype',
				iconCls : 'gecui-featuretype',
				leaf : true
			});
		}

		requestCount--;

		if (requestCount === 0) {
			workspacesNode.appendChild(workspaceNodes);
		}
	};

	var parseDataStore = function(response) {
		requestCount--;

		var dataStore = Ext.decode(response.responseText).dataStore;

		requestCount++;
		Ext.Ajax.request( {
			url : dataStore.featureTypes,
			scope : this,
			success : parseFeatureTypes
		});

	};

	var parseDataStores = function(response) {
		requestCount--;

		var dataStores = Ext.decode(response.responseText).dataStores.dataStore;

		if (!dataStores) {
			this.leaf = true;
			return;
		}

		for ( var i = 0; i < dataStores.length; i++) {
			var dataStore = dataStores[i];

			var dataStoreNode = {
				id : dataStore.href,
				text : dataStore.name,
				xtype : 'gecui-form-datastore',
				iconCls : 'gecui-datastore',
				children : []
			};

			this.children.push(dataStoreNode);

			requestCount++;
			Ext.Ajax.request( {
				url : dataStore.href,
				scope : dataStoreNode,
				success : parseDataStore
			});
		}

	};

	var parseWorkspace = function(response) {
		requestCount--;
		var workspace = Ext.decode(response.responseText).workspace;

		requestCount++;
		Ext.Ajax.request( {
			url : workspace.dataStores,
			scope : this,
			success : parseDataStores
		});

	};

	var parseWorkspaces = function(response) {
		var workspaces = Ext.decode(response.responseText).workspaces.workspace;

		for ( var i = 0; i < workspaces.length; i++) {
			if (i === workspaces.length) {
				finished = true;
			}

			var workspace = workspaces[i];

			var workspaceNode = {
				id : workspace.href,
				text : workspace.name,
				xtype : 'gecui-form-workspace',
				iconCls : 'gecui-workspace',
				children : []
			};

			workspaceNodes.push(workspaceNode);

			requestCount++;
			Ext.Ajax.request( {
				url : workspace.href,
				scope : workspaceNode,
				success : parseWorkspace
			});
		}
	};

	var parseLayers = function(response) {
		var layers = Ext.decode(response.responseText).layers.layer;

		for ( var i = 0; i < layers.length; i++) {
			var layer = layers[i];

			var layerNode = {
				id : layer.href,
				text : layer.name,
				xtype : 'gecui-form-layer',
				iconCls : 'gecui-layer',
				leaf : true
			};

			layerNodes.push(layerNode);
		}

		layersNode.appendChild(layerNodes);
	};

	var parseStyles = function(response) {
		var styles = Ext.decode(response.responseText).styles.style;

		for ( var i = 0; i < styles.length; i++) {
			var style = styles[i];

			var styleNode = {
				id : style.href,
				text : style.name,
				xtype : 'gecui-form-style',
				iconCls : 'gecui-style',
				leaf : true
			};

			styleNodes.push(styleNode);
		}

		stylesNode.appendChild(styleNodes);
	};

	Ext.Ajax.request( {
		url : gecui.url + 'workspaces.json',
		success : parseWorkspaces
	});

	Ext.Ajax.request( {
		url : gecui.url + 'layers.json',
		success : parseLayers
	});

	Ext.Ajax.request( {
		url : gecui.url + 'styles.json',
		success : parseStyles
	});
};