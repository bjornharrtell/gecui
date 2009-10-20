/**
 * @constructor
 */
gecui.tree.FeatureTypeNode = function(attr) {
	gecui.tree.FeatureTypeNode.superclass.constructor.call(this, Ext.apply( {
		listeners : {
			click : {
				fn : this.onClick
			},
			contextmenu : {
				fn : this.onContextmenu
			}
		}
	}, attr));

	Ext.Ajax.request( {
		url : attr.id,
		scope : this,
		success : this.parseFeatureType
	});
};

Ext.extend(gecui.tree.FeatureTypeNode, Ext.tree.TreeNode, {
	onContextmenu : function(node, e) {
		var menu = new Ext.menu.Menu( {
			items : [ {
				text : 'Delete'
			} ]
		});
		menu.showAt(e.getXY());
	},
	onClick : function(node, e) {
		gecui.Application.centerPanel.setFeatureType(node.id);
	},
	parseFeatureType : function(response) {
		var featureType = Ext.decode(response.responseText).featureType;

		this.setText(featureType.name);
	}
});
