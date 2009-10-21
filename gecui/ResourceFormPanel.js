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
		}

		panel.load( {
			url : href,
			method : 'GET'
		});
	},
	setResource : function(node) {
		if (node.attributes.cls == 'gecui-form-workspace') {
			this.initResourcePanel(node.id, gecui.form.WorkspaceFormPanel);
		} else if (node.attributes.cls == 'gecui-form-featureType') {
			this.initResourcePanel(node.id, gecui.form.FeatureTypeFormPanel);
		}

	}
});

Ext.reg('gecui-resourceformpanel', gecui.ResourceFormPanel);
