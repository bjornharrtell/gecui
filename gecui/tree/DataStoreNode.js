/**
 * @constructor
 */
gecui.tree.DataStoreNode = function(attr) {
	gecui.tree.DataStoreNode.superclass.constructor.call(this, Ext.apply( {},
			attr));

	Ext.Ajax.request( {
		url : attr.id,
		scope : this,
		success : this.parseDataStore
	});
};

Ext.extend(gecui.tree.DataStoreNode, Ext.tree.TreeNode, {
	parseFeatureTypes : function(response) {
		var featureTypes = Ext.decode(response.responseText).featureTypes.featureType;

		for ( var i = 0; i < featureTypes.length; i++) {
			this.appendChild(new gecui.tree.FeatureTypeNode( {
				id : featureTypes[i].href,
				text : featureTypes[i].name
			}));
		}
	},
	parseDataStore : function(response) {
		var dataStore = Ext.decode(response.responseText).dataStore;

		this.setText(dataStore.name);

		Ext.Ajax.request( {
			url : dataStore.featureTypes,
			scope : this,
			success : this.parseFeatureTypes
		});
	}
});
