/**
 * @constructor
 */
gecui.field.ConnectionParameters = function(config) {
    gecui.field.ConnectionParameters.superclass.constructor.call(this, Ext.apply( {
        autoHeight : true
    }, config));
};

Ext.extend(gecui.field.ConnectionParameters, Ext.grid.PropertyGrid, {
    isFormField: true,
    markInvalid: function() {},
    clearInvalid: function() {},
    getName : function() {
        return this.rendered && this.el.dom.name ? this.el.dom.name : this.name || this.id || '';
    },
    getValue : function() {
        return this.v;
    },
    setValue : function(v) {
        this.v = v;
        var entry = v.entry;

        var obj = {};
        for (key in entry) {
            obj[entry[key]['@key']] = entry[key]['$'];
        }
        
        this.setSource(obj);
    },
    validate : function(){
        return true;
    }
});

Ext.reg('gecui-connectionparametersfield', gecui.field.ConnectionParameters);
