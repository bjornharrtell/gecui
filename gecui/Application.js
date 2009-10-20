/**
 * @constructor
 */
gecui.Application = function() {

	gecui.url = '/geoserver/rest/';

	var resourceFormPanel = new gecui.ResourceFormPanel( {
		region : 'center',
		margins : '3 3 3 0'
	});
	
	// TODO: refactor into 
	var onContextmenu = function(node, e) {
		if (node.nodeType == 'geoserverFeatureType') {
			//
		}
	};

	var onClick = function(node, e) {
		resourceFormPanel.setResource(node.id);
	};
	
	// TODO: TreeLoader implementation directly on suitable REST API
	
	var treeLoader;
	
	var callback = function() {
		var viewport = new Ext.Viewport( {
			layout : 'border',
			items : [ {
				region : 'west',
				margins : '3 0 3 3',
				split : true,
				width : 200,
				autoScroll : true,
				xtype : 'treepanel',
				root : treeLoader.root,
				rootVisible : false,
				listeners : {
					onclick : {
						fn : onClick
					},
					contextmenu : {
						fn : onContextmenu
					}
				}
			}, {
				region: 'center',
				id: 'resourceFormPanel',
				xtype: 'gecui-resourceformpanel'
			} ]
		});
	};
	
	treeLoader = new gecui.TreeLoader(callback);
	
};

Ext.onReady(gecui.Application);
