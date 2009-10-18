/**
 * Node that will populate itself from Geoserver REST API
 * 
 * @constructor
 */
gecui.tree.WorkspaceNode = function(config) {
	var namespace = config.namespace;

	var self = this;

	var onContextmenu = function(node, e) {
		var menu = new Ext.menu.Menu( {
			items : [ {
				text : 'Add Layer'
			}, '-', {
				text : 'Delete'
			} ]
		});
		menu.showAt(e.getXY());
	};

	gecui.tree.WorkspaceNode.superclass.constructor.call(this, Ext.apply( {
		text : namespace.name,
		listeners : {
			contextmenu : {
				fn : onContextmenu
			}
		}
	}, config));

	var parseFeatureTypes = function(response) {
		var featureTypes = Ext.decode(response.responseText).featureTypes.featureType;

		if (!featureTypes) {
			return;
		}

		for ( var i = 0; i < featureTypes.length; i++) {
			self.appendChild(new gecui.tree.FeatureTypeNode( {
				featureType : featureTypes[i]
			}));
		}
	};

	var parseNamespace = function(response) {
		var featureTypesHref = Ext.decode(response.responseText).namespace.featureTypes;

		Ext.Ajax.request( {
			url : featureTypesHref,
			success : parseFeatureTypes
		});
	};

	Ext.Ajax.request( {
		url : namespace.href,
		success : parseNamespace
	});
};

Ext.extend(gecui.tree.WorkspaceNode, Ext.tree.TreeNode);
