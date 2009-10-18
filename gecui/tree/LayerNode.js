/**
 * @constructor
 */
gecui.tree.LayerNode = function(href) {
	var href = arguments[0];

	var self = this;

	var config = {};

	gecui.tree.LayerNode.superclass.constructor.call(this, Ext.apply( {},
			config));

	var parseLayer = function(response) {
		var layer = Ext.decode(response.responseText).layer;
		
		self.setText(layer.name);
	};

	Ext.Ajax.request( {
		url : href,
		success : parseLayer
	});
};

Ext.extend(gecui.tree.LayerNode, Ext.tree.TreeNode);
