/**
 * Form panel for a FeatureType
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.FeatureType = function(config) {
    gecui.form.FeatureType.superclass.constructor.call(this, Ext.apply( {
        frame : true,
        defaults : {
            anchor : '95%'
        },
        defaultType : 'textfield',
        bodyStyle : 'padding:5px 5px 0;',
        items : [ {
            name : 'title',
            fieldLabel : 'Title'
        }, {
            name : 'abstract',
            fieldLabel : 'Abstract',
            xtype : 'textarea',
            height : 100
        } ],
        buttons : [ {
            text : 'Save',
            formBind : true,
            scope : this,
            handler : this.updateFeatureType
        } ],
        reader : new gecui.data.ResourceReader('featureType')
    }, config));
};

Ext.extend(gecui.form.FeatureType, Ext.form.FormPanel, {
    updateFeatureType : function() {
        var data = this.reader.applyFormValues(this.getForm());

        Ext.Ajax.request( {
            method : 'PUT',
            url : gecui.url + 'workspaces/' + data.featureType.namespace.name + '/datastores/'
                    + data.featureType.store.name + '/featuretypes/' + data.featureType.name,
            jsonData : data
        });
    }
});

Ext.reg('gecui-featuretypeform', gecui.form.FeatureType);
