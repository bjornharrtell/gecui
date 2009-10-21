/**
 * Form panel for Workspaces
 * 
 * This form has a default layout of fields to support editing of Workspaces
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
gecui.form.WorkspaceFormPanel = function(config) {
	gecui.form.WorkspaceFormPanel.superclass.constructor.call(this, Ext.apply( {
		frame : true,
		defaults : {
			anchor : '95%'
		},
		defaultType : 'textfield',
		bodyStyle : 'padding:5px 5px 0;',
		items : [ {
			name : 'name',
			fieldLabel : 'Name'
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

gecui.form.WorkspaceFormPanel.Load = Ext.extend(Ext.form.Action.Load, {
	handleResponse : function(response) {

		var formData = {
			success : true,
			data : Ext.decode(response.responseText).workspace
		};

		return formData;
	}
});

Ext.extend(gecui.form.WorkspaceFormPanel, Ext.form.FormPanel, {
	load : function(options) {
		this.form.doAction(new gecui.form.WorkspaceFormPanel.Load(this.form, options), options);
	}
});

Ext.reg('gecui-form-workspace', gecui.form.WorkspaceFormPanel);
