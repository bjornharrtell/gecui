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
	initResourcePanel : function(href) {
		this.removeAll();

		var featureTypePanel = new gecui.FeatureTypePanel( {
			url : href,
			method: 'GET'
		});

		this.add(featureTypePanel);

		this.doLayout();

		featureTypePanel.load();
	},
	setResource : function(node) {
		this.initResourcePanel(node.id);
	}
});

Ext.reg('gecui-resourceformpanel', gecui.ResourceFormPanel);
