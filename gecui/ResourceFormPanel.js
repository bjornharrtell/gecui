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
			border: true,
			xtype : 'form'
		} ]
	}, config));
};

Ext.extend(gecui.ResourceFormPanel, Ext.Panel, {
	initResourcePanel : function(href, xtype) {
		var panel = this.items.get(0);

		if (!(panel.getXType() == xtype)) {
			this.removeAll();

			panel = this.add( {
				xtype : xtype
			});

			this.doLayout();
		}

		panel.load( {
			url : href,
			method : 'GET'
		});
	},
	setResourceFromNode : function(node) {
		this.initResourcePanel(node.id, node.attributes.xtype);
	}
});

Ext.reg('gecui-resourceformpanel', gecui.ResourceFormPanel);
