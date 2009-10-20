/**
 * Form panel that will adapt to supported Geoserver resources
 * 
 * @constructor
 */
gecui.ResourceFormPanel = function(config) {
	gecui.ResourceFormPanel.superclass.constructor.call(this, Ext.apply( {
		layout : 'fit'
	}, config));
};

Ext.extend(gecui.ResourceFormPanel, Ext.Panel, {
	initResourcePanel : function(resource) {
		this.removeAll();

		this.add( {
			xtype : 'gecui-featureTypePanel',
			resource : resource
		});
	},

	parseResource : function(response) {
		var resource = Ext.decode(response.responseText);
		this.initResourcePanel(resource);
	},

	setResource : function(href) {
		Ext.Ajax.request( {
			url : href,
			scope: this,
			success : parseResource
		});
	}
});

Ext.reg('gecui-resourceformpanel', gecui.ResourceFormPanel);
