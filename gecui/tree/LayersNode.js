/**
 * @constructor
 */
gecui.tree.LayersNode = function(config) {
	var self = this;

	gecui.tree.LayersNode.superclass.constructor.call(this, Ext.apply( {
		text : 'Layers'
	}, config));

	var success = function(response) {
		var layers = Ext.decode(response.responseText).layers.layer;

		for ( var i = 0; i < layers.length; i++) {
			self.appendChild(new gecui.tree.LayerNode(layers[i].href));
		}
	};

	Ext.Ajax.request( {
		url : gecui.url + 'layers.json',
		success : success
	});
};

Ext.extend(gecui.tree.LayersNode, Ext.tree.TreeNode);
