/**
 * @constructor
 */
gecui.Application = function() {

	gecui.Application.centerPanel = new gecui.FeatureTypePanel( {
		region : 'center'
	});

	var viewport = new Ext.Viewport( {
		layout : 'border',
		defaults : {
			border : false
		},
		items : [ {
			region : 'west',
			title : 'Geoserver',
			width : 200,
			items : {xtype: 'gecui-mainmenu'}
		}, gecui.Application.centerPanel ]
	});
};

Ext.onReady(gecui.Application);
