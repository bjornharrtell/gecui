/**
 * @constructor
 */
gecui.FeatureTypePanel = function(config) {

	var defaults = {
		width : 230
	};
	var defaultType = 'textfield';

	var name = new Ext.form.TextField({
		fieldLabel : 'Name'
	});
	var title = new Ext.form.TextField({
		fieldLabel : 'Title'
	});
	var abstract = new Ext.form.TextField({
		fieldLabel : 'Abstract'
	});
	
	var items = [ name, title, abstract ];

	var setCurrentFeatureType = function(url) {
		var success = function(response) {
			var featureType = Ext.decode(response.responseText).featureType;
			
			name.setValue(featureType.name);
			title.setValue(featureType.title);
			abstract.setValue(featureType.abstract);
		};
		
		Ext.Ajax.request( {
			url : url,
			success : success
		});
	};

	gecui.FeatureTypePanel.superclass.constructor.call(this, Ext.apply( {
		title: 'FeatureTypePanel',
		defaultType : defaultType,
		defaults : defaults,
		bodyStyle : 'padding:5px 5px 0',
		items : items
	}, config));

	this.setCurrentFeatureType = setCurrentFeatureType;
};

Ext.extend(gecui.FeatureTypePanel, Ext.form.FormPanel);
