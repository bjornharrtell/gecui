/**
 * Form panel that will adapt to supported Geoserver resources
 * 
 * @constructor
 */
gecui.ResourceFormPanel = function(config) {
	gecui.ResourceFormPanel.superclass.constructor.call(this, Ext.apply( {
		border : false,
		defaults : {
			border : false
		},
		layout : 'fit',
		items : [ {
			xtype : 'form',
			frame : true
		} ]
	}, config));
};

Ext.extend(gecui.ResourceFormPanel, Ext.Panel, {
	initResourcePanel : function(href, Class) {
		var panel = this.items.get(0);

		if (!(panel instanceof Class)) {
			this.removeAll();

			panel = new Class( {
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
		if (node.attributes.cls == 'gecui-workspace') {
			this.initResourcePanel(node.id, gecui.WorkspaceFormPanel);
		} else if (node.attributes.cls == 'gecui-featureType') {
			this.initResourcePanel(node.id, gecui.FeatureTypePanel);
		}

	}
});

Ext.reg('gecui-resourceformpanel', gecui.ResourceFormPanel);
