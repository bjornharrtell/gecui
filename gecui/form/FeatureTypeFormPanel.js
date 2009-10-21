/**
 * Form panel for FeatureTypes
 * 
 * This form has a default layout of fields to support editing of FeatureType
 * resources.
 * 
 * TODO: Support the full data structure and CRUD operations. A wish would be
 * that the Geoserver REST API get support for the built in JSON structure in
 * Ext JS for JsonReader and use that for the CRUD.
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 * @param config.url
 *            URL to FeatureType resource
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
			fieldLabel : 'Name'
		}, {
			name : 'title',
			fieldLabel : 'Title'
		}, {
			name : 'abstract',
			fieldLabel : 'Abstract',
			xtype: 'textarea',
			height: 100
		} ],
		buttons : [ {
			text : 'Save',
			formBind : true,
			scope : this,
			handler : function() {
				this.getForm().submit();
			}
		} ]

	}, config));
};

gecui.form.FeatureTypeFormPanel.Load = Ext.extend(Ext.form.Action.Load, {
	handleResponse : function(response) {
		var featureType = Ext.decode(response.responseText);

		var formData = {
			success : true,
			data : featureType.featureType
		};

		return formData;
	}
});

Ext.extend(gecui.form.FeatureTypeFormPanel, Ext.form.FormPanel, {
	load : function(options) {
		this.form.doAction(new gecui.form.FeatureTypeFormPanel.Load(this.form, options), options);
	}
});

Ext.reg('gecui-form-featuretype', gecui.form.FeatureTypeFormPanel);
