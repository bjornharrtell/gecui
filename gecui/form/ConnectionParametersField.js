/**
 * @constructor
 */
gecui.form.ConnectionParametersField = function(config) {
    gecui.form.ConnectionParametersField.superclass.constructor.call(this, Ext.apply( {
        autoHeight : true,
        source : {
            "(name)" : "My Object",
            "Created" : new Date(Date.parse('10/15/2006')),
            "Available" : false,
            "Version" : .01,
            "Description" : "A test object"
        }
    }, config));
};

Ext.extend(gecui.form.ConnectionParametersField, Ext.form.Field);

Ext.extend(gecui.form.ConnectionParametersField, Ext.grid.PropertyGrid);

Ext.reg('gecui-connectionparametersfield', gecui.form.ConnectionParametersField);
