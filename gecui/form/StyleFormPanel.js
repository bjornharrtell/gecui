/**
 * Form panel for a Style
 * 
 * TODO: Optionally Use GeoExt Styler to edit the SLD
 * 
 * @constructor
 */
gecui.form.StyleFormPanel = function(config) {
	gecui.form.StyleFormPanel.superclass.constructor.call(this, Ext.apply( {
		frame : true,
		defaults : {
			border: false,
			anchor : '100% 100%'
		},
		hideLabels : true,
		defaultType : 'textfield',
		bodyStyle : 'padding:5px 5px 0;',
		items : [ {
			xtype : 'tabpanel',
			activeTab : 0,
			items : [ {
				title: 'Text editor',
				name : 'filename',
				xtype : 'gecui-form-stylefield',
				anchor : '100% 100%'
			}, {
				title: 'Styler',
				html : 'not implemented yet'
			} ]
		} ],
		buttons : [ {
			text : 'Save',
			formBind : true,
			scope : this,
			handler : function() {
				this.getForm().submit();
			}
		} ],
		reader : new gecui.data.ResourceReader('style')
	}, config));
};

Ext.extend(gecui.form.StyleFormPanel, Ext.form.FormPanel);

Ext.reg('gecui-form-style', gecui.form.StyleFormPanel);
