/**
 * Form panel for a Style
 * 
 * TODO: Optionally Use GeoExt Styler to edit the SLD
 * 
 * @constructor
 */
gecui.form.Style = function(config) {
    var reader = new gecui.data.ResourceReader('style');

    var submit = function() {
        var name = reader.data.name;
        var filename = this.getForm().findField('filename').filename;
        var sld = this.getForm().findField('filename').getValue();

        Ext.Ajax.request( {
            method : 'PUT',
            url : gecui.url + 'styles/' + name,
            headers : {
                'Content-Type' : 'application/vnd.ogc.sld+xml'
            },
            params : sld,
            failure : gecui.util.failure
        });
    };

    gecui.form.Style.superclass.constructor.call(this, Ext.apply( {
        frame : true,
        hideLabels : true,
        defaultType : 'textfield',
        items : [ {
            xtype : 'tabpanel',
            border : false,
            anchor : '100% 100%',
            activeTab : 0,
            items : [ {
                title : 'Text editor',
                border : false,
                layout : 'form',
                hideLabels : true,
                items : [ {
                    name : 'filename',
                    xtype : 'gecui-stylefield',
                    anchor : '100% 100%'
                } ]
            }, {
                title : 'Styler',
                border : false,
                html : 'not implemented yet'
            } ]
        } ],
        buttons : [ {
            text : 'Save',
            formBind : true,
            scope : this,
            handler : submit
        } ],
        reader : reader
    }, config));
};

Ext.extend(gecui.form.Style, Ext.form.FormPanel);

Ext.reg('gecui-styleform', gecui.form.Style);