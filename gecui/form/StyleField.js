// TODO: Implement a field that loads a style

gecui.form.Style = function(config) {
	gecui.form.Style.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.form.Style, Ext.form.TextArea, {
	setValue : function(filename) {
		this.filename = filename;

		var success = function(response) {
			var sld = response.responseText;

			Ext.form.TextArea.prototype.setValue.call(this, sld);
		};

		Ext.Ajax.request( {
			url : gecui.stylesurl + filename,
			scope : this,
			success : success
		});
	}
});

Ext.reg('gecui-form-stylefield', gecui.form.Style);
