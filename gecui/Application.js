/**
 * @constructor
 */
gecui.Application = function() {

    gecui.store = new GeoExt.data.WMSCapabilitiesStore( {
        url : '/geoserver/ows?service=wms&version=1.1.1&request=GetCapabilities'
    });
    gecui.store.load();

    var resourceFormPanel = new gecui.form.ResourceFormPanel( {
        region : 'center',
        margins : '3 3 3 0'
    });

    var root = new Ext.tree.TreeNode( {
        text : 'Geoserver',
        expanded : true
    });
    
    root.appendChild( [ new gecui.node.WorkspacesNode(), new gecui.node.LayersNode(),
           new gecui.node.StylesNode() ]);

    var viewport = new Ext.Viewport( {
        layout : 'border',
        items : [ {
            region : 'west',
            margins : '3 0 3 3',
            split : true,
            width : 200,
            autoScroll : true,
            xtype : 'treepanel',
            root : root,
            rootVisible : false,
            listeners : {
                click : {
                    fn : function(node, e) {
                        resourceFormPanel.setResourceFromNode(node);
                    }
                },
                contextmenu : {
                    fn : function(node, e) {
                        Ext.create( {
                            xtype : node.attributes.xtype + 'nodemenu',
                            node : node
                        }).showAt(e.getXY());
                    }
                }
            }
        }, resourceFormPanel ]

    });

};

Ext.onReady(gecui.Application);
