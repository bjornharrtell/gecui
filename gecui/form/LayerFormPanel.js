/**
 * Form panel for a Layer
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.LayerFormPanel = function(config) {
	gecui.form.LayerFormPanel.superclass.constructor.call(this, Ext.apply( {
		frame : true,
		defaults : {
			anchor : '95%'
		},
		defaultType : 'textfield',
		bodyStyle : 'padding:5px 5px 0;',
		items : [ {
			name : 'name',
			fieldLabel : 'Name'
		}, {
			name : 'styles',
			fieldLabel : 'Styles'
		} ],
		buttons : [ {
			text : 'Save',
			formBind : true,
			scope : this,
			handler : function() {
				this.getForm().submit();
			}
		} ],
		reader : new gecui.data.ResourceReader('layer')
	}, config));
};

Ext.extend(gecui.form.LayerFormPanel, Ext.form.FormPanel);

Ext.reg('gecui-form-layer', gecui.form.LayerFormPanel);
