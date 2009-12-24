/**
 * Form panel for a Layer
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.Layer = function(config) {
    // TODO: find out if one MapPanel instance could be shared
    this.mapPanel = new GeoExt.MapPanel( {
        border : false,
        map : {
            controls : []
        }
    });
    
    gecui.form.Layer.superclass.constructor.call(this, Ext.apply( {
        layout : 'fit',
        border : false,
        items : [ {
            xtype : 'tabpanel',
            anchor : '100% 100%',
            activeTab : 0,
            items : [ {
                title : 'Properties',
                layout : 'form',
                region : 'center',
                defaultType : 'textfield',
                bodyStyle : 'padding:5px',
                defaults : {
                    anchor : '95%'
                },
                items : [ {
                    name : 'path',
                    fieldLabel : 'Path'
                }, {
                    name : 'styles',
                    xtype : 'gecui-stylesfield',
                    fieldLabel : 'Styles'
                } ]
            }, {
                title : 'Preview',
                layout : 'fit',
                border : false,
                items : [ this.mapPanel ]
            } ]
        } ],
        buttons : [ {
            text : 'Save',
            formBind : true,
            scope : this,
            handler : this.updateLayer
        } ],
        reader : new gecui.data.ResourceReader('layer')
    }, config));
};

Ext.extend(gecui.form.Layer, Ext.form.FormPanel, {
    mapPanel : null,
    updateMap : function(layerName) {
        this.mapPanel.layers.removeAll();

        var records = gecui.store.query('name', new RegExp('.*' + layerName));
        var record = records.get(0);
        var copy = record.copy();

        this.mapPanel.layers.add(copy);
        this.mapPanel.map.zoomToExtent(OpenLayers.Bounds.fromArray(copy.get("llbbox")));
    },
    updateLayer : function() {
        var data = reader.applyFormValues(this.getForm());

        Ext.Ajax.request( {
            method : 'PUT',
            url : gecui.url + 'layers/' + data.layer.name,
            jsonData : data
        });
    }
});

Ext.reg('gecui-layerform', gecui.form.Layer);
