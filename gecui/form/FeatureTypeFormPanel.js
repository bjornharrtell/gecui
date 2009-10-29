/**
 * Form panel for a FeatureType
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.FeatureTypeFormPanel = function(config) {
	var reader = new gecui.data.ResourceReader('featureType');
	
	var submit = function() {
		var data = reader.applyFormValues(this.getForm());
		
		Ext.Ajax.request({
			method: 'PUT',
			url: gecui.url + 'workspaces/' + data.featureType.namespace.name + '/datastores/'+ data.featureType.store.name + '/featuretypes/' + data.featureType.name,
			jsonData: data
		});
	};
	
	gecui.form.FeatureTypeFormPanel.superclass.constructor.call(this, Ext.apply( {
		frame : true,
		defaults : {
			anchor : '95%'
		},
		defaultType : 'textfield',
		bodyStyle : 'padding:5px 5px 0;',
		items : [{
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
			handler : submit
		} ],
		reader : reader
	}, config));
};

Ext.extend(gecui.form.FeatureTypeFormPanel, Ext.form.FormPanel);

Ext.reg('gecui-form-featuretype', gecui.form.FeatureTypeFormPanel);
