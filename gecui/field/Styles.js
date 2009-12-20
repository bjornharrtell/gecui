/**
 * TODO: implement GUI display/choose a style
 * 
 * @constructor
 */
gecui.field.Styles = function(config) {
    gecui.field.Styles.superclass.constructor.call(this, Ext.apply( {

    }, config));
};

Ext.extend(gecui.field.Styles, Ext.form.Field, {
    getValue : function() {
        return this.v;
    },
    setValue : function(v) {
        this.v = v;
    }
});

Ext.reg('gecui-stylesfield', gecui.field.Styles);
