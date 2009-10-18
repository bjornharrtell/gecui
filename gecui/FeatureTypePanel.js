/**
 * Form panel for feature types
 * 
 * TODO: Support the full data structure and CRUD operations. A wish would be
 * that the Geoserver REST API get support for the built in JSON structure in
 * Ext JS for JsonReader and use that for the CRUD.
 * 
 * @constructor
 */
gecui.FeatureTypePanel = function(config) {

	var name = new Ext.form.TextField( {
		fieldLabel : 'Name'
	});
	var title = new Ext.form.TextField( {
		fieldLabel : 'Title'
	});
	var abstract = new Ext.form.TextField( {
		fieldLabel : 'Abstract'
	});

	var items = [name, title, abstract ];

	var featureType = null;

	var href = null;

	var setFeatureType = function() {
		href = arguments[0];

		var setFeatureType = function(featureType) {
			name.setValue(featureType.name);
			title.setValue(featureType.title);
			abstract.setValue(featureType.abstract);
		};

		var success = function(response) {
			featureType = Ext.decode(response.responseText).featureType;
			setFeatureType(featureType);
		};

		Ext.Ajax.request( {
			url : href,
			success : success
		});
	};

	var onSave = function() {
		featureType.name = name.getValue();
		featureType.title = title.getValue();
		featureType.abstract = abstract.getValue();

		Ext.Ajax.request( {
			method : 'PUT',
			url : href,
			jsonData : {
				featureType : featureType
			}
		});
	};

	gecui.FeatureTypePanel.superclass.constructor.call(this, Ext.apply( {
		title: 'FeatureType properties',
		frame: true,
		defaults: {anchor : '95%'},
		bodyStyle : 'padding:5px 5px 0;',
		items : items,
		buttons : [ {
			text : 'Save',
			handler : onSave
		} ]

	}, config));

	this.setFeatureType = setFeatureType;
};

Ext.extend(gecui.FeatureTypePanel, Ext.form.FormPanel);
