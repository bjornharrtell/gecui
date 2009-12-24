// TODO: Implement a field that loads a style

gecui.field.Style = function(config) {
    gecui.field.Style.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.field.Style, Ext.form.TextArea, {
    filename: null,
    processResponse: function(response) {
        // use the response text as value
        Ext.form.TextArea.prototype.setValue.call(this, response.responseText);
    },
    setValue : function(filename) {
        this.filename = filename;

        Ext.Ajax.request( {
            url : gecui.stylesurl + filename,
            scope : this,
            success : this.processResponse
        });
    }
});

Ext.reg('gecui-stylefield', gecui.field.Style);
