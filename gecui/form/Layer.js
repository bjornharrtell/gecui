/**
 * Form panel for a Layer
 * 
 * TODO: Support complex fields (keyvalues and attributes etc).
 * 
 * @constructor
 */
gecui.form.Layer = function(config) {
    var reader = new gecui.data.ResourceReader('layer');

    var submit = function() {
        var data = reader.applyFormValues(this.getForm());

        Ext.Ajax.request( {
            method : 'PUT',
            url : gecui.url + 'layers/' + data.layer.name,
            jsonData : data
        });
    };

    var mapPanel = new GeoExt.MapPanel( {
        border: false,
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
                border: false,
                items : [ mapPanel ]
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

    var updateMap = function(layerName) {
        mapPanel.layers.removeAll();

        var records = gecui.store.query('name', new RegExp('.*' + layerName));
        var record = records.get(0);
        var copy = record.copy();

        mapPanel.layers.add(copy);
        mapPanel.map.zoomToExtent(OpenLayers.Bounds.fromArray(copy.get("llbbox")));
    };

    this.updateMap = updateMap;
};

Ext.extend(gecui.form.Layer, Ext.form.FormPanel);

Ext.reg('gecui-layerform', gecui.form.Layer);
