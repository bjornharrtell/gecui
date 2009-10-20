/**
 * Use the REST API to construct root node attribute configuration for a TreePanel
 * 
 * @constructor
 * @param callback
 */
gecui.TreeLoader = function(callback) {
	
	var workspaceNodes = [];
	var layerNodes = [];

	var root = {
		text : 'Geoserver',
		children : [ {
			text : 'Workspaces',
			children : workspaceNodes,
			expanded: true
		}, {
			text : 'Layers',
			children : layerNodes,
			expanded: true
		} ]
	};

	var parseFeatureTypes = function(response) {
		var featureTypes = Ext.decode(response.responseText).featureTypes.featureType;

		for ( var i = 0; i < featureTypes.length; i++) {
			this.children.push( {
				id : featureTypes[i].href,
				text : featureTypes[i].name,
				leaf: true
			});
		}
		
		callback.call();
	};

	var parseDataStore = function(response) {
		var dataStore = Ext.decode(response.responseText).dataStore;

		Ext.Ajax.request( {
			url : dataStore.featureTypes,
			scope : this,
			success : parseFeatureTypes
		});
	};

	var parseDataStores = function(response) {
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

			Ext.Ajax.request( {
				url : dataStore.href,
				scope : dataStoreNode,
				success : parseDataStore
			});
		}
	};

	var parseWorkspace = function(response) {
		var workspace = Ext.decode(response.responseText).workspace;

		Ext.Ajax.request( {
			url : workspace.dataStores,
			scope : this,
			success : parseDataStores
		});
	};

	var parseWorkspaces = function(response) {
		var workspaces = Ext.decode(response.responseText).workspaces.workspace;

		for ( var i = 0; i < workspaces.length; i++) {
			var workspace = workspaces[i];

			var workspaceNode = {
				id : workspace.href,
				text : workspace.name,
				children : []
			};

			workspaceNodes.push(workspaceNode);

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
				leaf: true
			};
			
			layerNodes.push(layerNode);
		}
	};

	Ext.Ajax.request( {
		url : gecui.url + 'workspaces.json',
		success : parseWorkspaces
	});
	
	Ext.Ajax.request( {
		url : gecui.url + 'layers.json',
		success : parseLayers
	});
	
	this.root = root;
};