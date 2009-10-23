/**
 * Form panel for a FeatureType
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.FeatureTypeFormPanel = function(config) {
	gecui.form.FeatureTypeFormPanel.superclass.constructor.call(this, Ext.apply( {
		frame : true,
		defaults : {
			anchor : '95%'
		},
		defaultType : 'textfield',
		bodyStyle : 'padding:5px 5px 0;',
		items : [ {
			name : 'name',
			fieldLabel : 'Name',
			disabled : true
		}, {
			name : 'title',
			fieldLabel : 'Title'
		}, {
			name : 'abstract',
			fieldLabel : 'Abstract',
			xtype : 'textarea',
			height : 100
		} ],
		buttons : [ {
			text : 'Save',
			formBind : true,
			scope : this,
			handler : function() {
				this.getForm().submit();
			}
		} ],
		reader : new gecui.data.ResourceReader('featureType')
	}, config));
};

Ext.extend(gecui.form.FeatureTypeFormPanel, Ext.form.FormPanel);

Ext.reg('gecui-form-featuretype', gecui.form.FeatureTypeFormPanel);
