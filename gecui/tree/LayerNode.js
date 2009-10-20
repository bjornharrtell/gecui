/**
 * @constructor
 */
gecui.tree.LayerNode = function(attr) {
	gecui.tree.LayerNode.superclass.constructor.apply(this, arguments);

	Ext.Ajax.request( {
		url : attr.id,
		scope: this,
		success : this.parseLayer
	});
};

Ext.extend(gecui.tree.LayerNode, Ext.tree.TreeNode, {
	parseLayer: function(response) {
		var layer = Ext.decode(response.responseText).layer;
		
		this.setText(layer.name);
	}
});

//this is to support future TreeLoader support 
Ext.tree.TreePanel.nodeTypes.geoserverLayer = gecui.tree.LayerNode;