/**
 * Use the REST API to construct root node attribute configuration for a
 * TreePanel
 * 
 * @constructor
 * @param callback
 */
gecui.TreeLoader = function(workspacesNode, layersNode) {

	var workspaceNodes = [];
	var layerNodes = [];
	
	var requestCount = 0;
	
	var parseFeatureTypes = function(response) {
		var featureTypes = Ext.decode(response.responseText).featureTypes.featureType;

		for ( var i = 0; i < featureTypes.length; i++) {
			this.children.push( {
				id : featureTypes[i].href,
				text : featureTypes[i].name,
				cls: 'gecui-form-featuretype',
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
				cls: 'gecui-form-workspace',
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
				id : layers[i].href,
				text : layers[i].name,
				cls: 'gecui-form-layer',
				leaf : true
			};

			layerNodes.push(layerNode);
		}

		layersNode.appendChild(layerNodes);
	};

	Ext.Ajax.request( {
		url : gecui.url + 'workspaces.json',
		success : parseWorkspaces
	});

	Ext.Ajax.request( {
		url : gecui.url + 'layers.json',
		success : parseLayers
	});
};