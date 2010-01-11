/**
 * @constructor
 */
gecui.field.DefaultStyle = function(config) {
    gecui.field.DefaultStyle.superclass.constructor.call(this, Ext.apply( {
        layout : 'fit',
        items : [ new Ext.form.ComboBox( {
            mode : 'local',
            triggerAction : 'all',
            store : [ [ null, 'None' ] ],
            listeners : {
                'select' : {
                    fn : function(field, row) {
                        this.defaultStyle = row.get(row.fields.get(0).name);
                    },
                    scope : this
                }
            }
        }) ]
    }, config));
};

Ext.extend(gecui.field.DefaultStyle, Ext.Container, {
    isFormField : true,
    markInvalid : function() {
    },
    clearInvalid : function() {
    },
    getName : function() {
        return this.rendered && this.el.dom.name ? this.el.dom.name : this.name || this.id || '';
    },
    getValue : function() {
        return this.defaultStyle;
    },
    setValue : function(defaultStyle) {
        this.defaultStyle = defaultStyle;
    },
    setStyles : function(styles) {
        var comboBox = this.items.get(0);
        var store = comboBox.getStore();

        var array = [];
        for ( var key in styles) {
            array.push( [ styles[key], styles[key]['name'] ]);
        }

        store.loadData(array);

        comboBox.setValue(this.defaultStyle.name);
    }
});

Ext.reg('gecui-defaultstylefield', gecui.field.DefaultStyle);
