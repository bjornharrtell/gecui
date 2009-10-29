/**
 * Hacky implementation of specialized JsonReader to read Geoserver JSON resources to Ext Js forms.
 * 
 * @constructor
 */
gecui.data.ResourceReader = function(name) {
	this.data = null;
	this.name = name;
	
	this.applyFormValues = function(form) {
		var newdata = {};
		
		Ext.apply(newdata, this.data);
		
		for (key in newdata) {
			var field = form.findField(key);
			if (field) {
				var value = field.getValue();
				newdata[key] = value;
			}
		}
		
		var newdata2 = {};
		newdata2[this.name] = newdata;
		
		return newdata2;
	};
	
	this.read = function(response) {
		this.data = Ext.decode(response.responseText)[name];
		
		return {
			success : true,
			records : [ {
				data : this.data
			} ]
		};
	};
};
