/**
 * TODO: implement GUI display/choose a style
 * 
 * @constructor
 */
gecui.form.StylesField = function(config) {
	gecui.form.StylesField.superclass.constructor.call(this, Ext.apply( {

	}, config));
};

Ext.extend(gecui.form.StylesField, Ext.form.Field, {
	getValue : function() {
		return this.v;
	},
	setValue : function(v) {
		this.v = v;
	}
});

Ext.reg('gecui-form-stylesfield', gecui.form.StylesField);
