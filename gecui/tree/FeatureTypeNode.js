/**
 * Node that will populate itself from Geoserver REST API
 * 
 * @constructor
 */
gecui.tree.FeatureTypeNode = function(config) {
	var featureType = config.featureType;

	var self = this;

	var onClick = function() {
		gecui.Application.centerPanel.setCurrentFeatureType(featureType.href);
	};

	var onContextmenu = function(node, e) {
		var menu = new Ext.menu.Menu( {
			items : [ {
				text : 'Delete'
			} ]
		});
		menu.showAt(e.getXY());
	};

	gecui.tree.FeatureTypeNode.superclass.constructor.call(this, Ext.apply( {
		text : featureType.name,
		listeners : {
			click : {
				fn : onClick,
				scope : featureType
			},
			contextmenu : {
				fn : onContextmenu
			}
		}
	}, config));
};

Ext.extend(gecui.tree.FeatureTypeNode, Ext.tree.TreeNode);