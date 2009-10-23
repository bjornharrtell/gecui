/**
 * Hacky implementation of specialized JsonReader to read Geoserver JSON resources to Ext Js forms.
 * 
 * @constructor
 */
gecui.data.ResourceReader = function(name) {
	this.data = null;
	
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
