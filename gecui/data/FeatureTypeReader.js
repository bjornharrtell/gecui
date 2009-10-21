/**
 * @constructor
 */
gecui.data.FeatureTypeReader = function() {
	Ext.data.JsonReader.superclass.constructor.apply(this, arguments);
};

Ext.extend(gecui.data.FeatureTypeReader, Ext.data.JsonReader, {
	readRecords : function(o) {
		var transform = {
			success : true,
			root : [ o.featureType ]
		};

		Ext.data.JsonReader.prototype.readRecords.call(this, transform);
	}
});