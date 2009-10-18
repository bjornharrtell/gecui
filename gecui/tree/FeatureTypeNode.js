/**
 * @constructor
 */
gecui.tree.FeatureTypeNode = function() {
	var href = arguments[0];

	var self = this;
	
	var config = {};
	
	var featureType = null;

	var onClick = function() {
		gecui.Application.centerPanel.setFeatureType(href);
	};

	// TODO: this is just mockup atm
	var onContextmenu = function(node, e) {
		var menu = new Ext.menu.Menu( {
			items : [ {
				text : 'Delete'
			} ]
		});
		menu.showAt(e.getXY());
	};

	gecui.tree.FeatureTypeNode.superclass.constructor.call(this, Ext.apply( {
		listeners : {
			click : {
				fn : onClick
			},
			contextmenu : {
				fn : onContextmenu
			}
		}
	}, config));
	
	var parseFeatureType = function(response) {
		featureType = Ext.decode(response.responseText).featureType;
		
		self.setText(featureType.name);
	};
	
	Ext.Ajax.request( {
		url : href,
		success : parseFeatureType
	});
};

Ext.extend(gecui.tree.FeatureTypeNode, Ext.tree.TreeNode);