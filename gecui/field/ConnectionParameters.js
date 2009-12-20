/**
 * @constructor
 */
gecui.field.ConnectionParameters = function(config) {
    gecui.field.ConnectionParameters.superclass.constructor.call(this, Ext.apply( {
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

Ext.extend(gecui.field.ConnectionParameters, Ext.form.Field);

Ext.extend(gecui.field.ConnectionParameters, Ext.grid.PropertyGrid);

Ext.reg('gecui-connectionparametersfield', gecui.field.ConnectionParameters);
