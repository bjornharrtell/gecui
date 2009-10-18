/**
 * @constructor
 */
gecui.tree.DataStoreNode = function() {
	var href = arguments[0];

	var self = this;

	var config = {};

	gecui.tree.DataStoreNode.superclass.constructor.call(this, Ext.apply( {},
			config));

	var parseFeatureTypes = function(response) {
		var featureTypes = Ext.decode(response.responseText).featureTypes.featureType;

		for ( var i = 0; i < featureTypes.length; i++) {
			self.appendChild(new gecui.tree.FeatureTypeNode(
					featureTypes[i].href));
		}
	};

	var parseDataStore = function(response) {
		var dataStore = Ext.decode(response.responseText).dataStore;

		self.setText(dataStore.name);

		Ext.Ajax.request( {
			url : dataStore.featureTypes,
			success : parseFeatureTypes
		});
	};

	Ext.Ajax.request( {
		url : href,
		success : parseDataStore
	});
};

Ext.extend(gecui.tree.DataStoreNode, Ext.tree.TreeNode);
