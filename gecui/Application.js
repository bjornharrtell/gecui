/**
 * @constructor
 */
gecui.Application = function() {

	var centerPanel = new gec.FeatureTypePanel({region: 'center'});

	var root = new Ext.tree.TreeNode( {
		text : 'Geoserver'
	});

	var tree = new Ext.tree.TreePanel( {
		root : root,
		rootVisible : false,
		border : false
	});

	new Ext.tree.TreeEditor(tree);

	// TODO: needs refactoring badly...
	var success = function(response) {
		var namespaces = Ext.decode(response.responseText).namespaces.namespace;

		var success3 = function(response) {

			var featureTypes = Ext.decode(response.responseText).featureTypes.featureType;

			if (!featureTypes) {
				return;
			}

			for ( var i = 0; i < featureTypes.length; i++) {

				var featureType = featureTypes[i];

				var onClick = function() {
					centerPanel.setCurrentFeatureType(this.href);
					//centerPanel.getUpdater().update(this.href);
				};

				var onContextmenu = function(node, e) {
					var menu = new Ext.menu.Menu( {
						items : [ {
							text : 'Preview'
						}, '-', {
							text : 'Delete'
						} ]
					});
					menu.showAt(e.getXY());
				};

				var node = new Ext.tree.TreeNode( {
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
				});

				this.appendChild(node);
			}

		};

		var success2 = function(response) {
			var featureTypesURL = Ext.decode(response.responseText).namespace.featureTypes;

			Ext.Ajax.request( {
				url : featureTypesURL,
				scope : this,
				success : success3
			});
		};

		for ( var i = 0; i < namespaces.length; i++) {

			var namespace = namespaces[i];

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

			var node = new Ext.tree.TreeNode( {
				text : namespace.name,
				listeners : {
					contextmenu : {
						fn : onContextmenu
					}
				}
			});

			root.appendChild(node);

			Ext.Ajax.request( {
				url : namespace.href,
				scope : node,
				success : success2
			});
		}
	};

	var viewport = new Ext.Viewport( {
		layout : 'border',
		defaults : {
			border : false
		},
		items : [ {
			region : 'west',
			title : 'Geoserver',
			width : 200,
			items : tree
		}, centerPanel ]
	});

	Ext.Ajax.request( {
		url : '/geoserver/rest/namespaces.json',
		success : success
	});
};

Ext.onReady(gecui.Application);
