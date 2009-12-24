/**
 * Form panel for a Style
 * 
 * TODO: Optionally Use GeoExt Styler to edit the SLD
 * 
 * @constructor
 */
gecui.form.Style = function(config) {
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
            handler : this.updateSLD
        } ],
        reader : new gecui.data.ResourceReader('style')
    }, config));
};

Ext.extend(gecui.form.Style, Ext.form.FormPanel, {
    updateSLD : function() {
        Ext.Ajax.request( {
            method : 'PUT',
            url : gecui.url + 'styles/' + this.reader.data.name,
            headers : {
                'Content-Type' : 'application/vnd.ogc.sld+xml'
            },
            params : this.getForm().findField('filename').getValue(),
            failure : gecui.util.failure
        });
    }
});

Ext.reg('gecui-styleform', gecui.form.Style);
