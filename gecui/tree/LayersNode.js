/**
 * @constructor
 */
gecui.tree.LayersNode = function(attr) {
	gecui.tree.LayersNode.superclass.constructor.call(this, Ext.apply( {
		text : 'Layers'
	}, attr));

	var success = function(response) {
		var layers = Ext.decode(response.responseText).layers.layer;

		for ( var i = 0; i < layers.length; i++) {
			this.appendChild(new gecui.tree.LayerNode( {
				id : layers[i].href, // TODO: not unique!
				text : layers[i].name
			}));
		}
	};

	Ext.Ajax.request( {
		url : gecui.url + 'layers.json',
		scope : this,
		success : this.parseLayers
	});
};

Ext.extend(gecui.tree.LayersNode, Ext.tree.TreeNode, {
	parseLayers : function(response) {
		var layers = Ext.decode(response.responseText).layers.layer;

		for ( var i = 0; i < layers.length; i++) {
			this.appendChild(new gecui.tree.LayerNode( {
				id : layers[i].href, // TODO: not unique!
				text : layers[i].name
			}));
		}
	}
});
