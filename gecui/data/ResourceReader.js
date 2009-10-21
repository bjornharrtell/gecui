/**
 * Hacky implementation of specialized JsonReader to read Geoserver JSON resources to Ext Js forms.
 * 
 * @constructor
 */
gecui.data.ResourceReader = function(name) {
	this.read = function(response) {
		return {
			success : true,
			records : [ {
				data : Ext.decode(response.responseText)[name]
			} ]
		};
	};
};
