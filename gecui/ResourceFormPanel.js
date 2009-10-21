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
		var panel = this.items.get(0);

		if (!(panel instanceof gecui.FeatureTypePanel)) {
			this.removeAll();

			panel = new gecui.FeatureTypePanel( {
				border : false
			});

			this.add(panel);

			this.doLayout();

			panel.load( {
				url : href,
				method : 'GET'
			});
		}

		panel.load( {
			url : href,
			method : 'GET'
		});
	},
	setResource : function(node) {
		this.initResourcePanel(node.id);
	}
});

Ext.reg('gecui-resourceformpanel', gecui.ResourceFormPanel);
