/**
 * Form panel for a Style
 * 
 * TODO: Optionally Use GeoExt Styler to edit the SLD
 * 
 * @constructor
 */
gecui.form.StyleFormPanel = function(config) {
	var submit = function() {
		var filename = this.getForm().findField('filename').filename;
		var sld = this.getForm().findField('filename').getValue();
		
		Ext.Ajax.request({
			method: 'PUT',
			url: '/geoserver/styles/' + filename,
			headers: { 'Content-Type': 'application/vnd.ogc.sld+xml' },
			params: sld
		});
	
	};
	
	gecui.form.StyleFormPanel.superclass.constructor.call(this, Ext.apply( {
		frame: true,
		hideLabels : true,
		defaultType : 'textfield',
		items : [ {
			xtype : 'tabpanel',
			border: false,
			anchor : '100% 100%',
			activeTab : 0,
			items : [ {title: 'Text editor',
				border: false,
				layout: 'form',
				hideLabels : true,
				items : [{
					
				name : 'filename',
				xtype : 'gecui-form-stylefield',
				anchor : '100% 100%'
			}]}, {
				title: 'Styler',
				border: false,
				html : 'not implemented yet'
			} ]
		} ],
		buttons : [ {
			text : 'Save',
			formBind : true,
			scope : this,
			handler : submit
		} ],
		reader : new gecui.data.ResourceReader('style')
	}, config));
};

Ext.extend(gecui.form.StyleFormPanel, Ext.form.FormPanel);

Ext.reg('gecui-form-style', gecui.form.StyleFormPanel);
