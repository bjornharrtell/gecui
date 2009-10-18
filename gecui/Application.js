/**
 * @constructor
 */
gecui.Application = function() {
	
	gecui.url = '/geoserver/rest/';

	gecui.Application.centerPanel = new gecui.FeatureTypePanel( {
		region : 'center',
		margins : '3 3 3 0'
	});

	var viewport = new Ext.Viewport( {
		layout : 'border',
		items : [ {
			region : 'west',
			xtype : 'gecui-mainmenu',
			margins : '3 0 3 3',
			split : true,
			width : 200,
			autoScroll: true
		}, gecui.Application.centerPanel ]
	});
};

Ext.onReady(gecui.Application);
