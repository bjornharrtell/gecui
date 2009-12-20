// TODO: Implement a field that loads a style

gecui.field.Style = function(config) {
    gecui.field.Style.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.field.Style, Ext.form.TextArea, {
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

Ext.reg('gecui-stylefield', gecui.field.Style);
