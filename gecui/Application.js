/**
 * @constructor
 */
gecui.Application = function() {

    gecui.store = new GeoExt.data.WMSCapabilitiesStore({
        url: '/geoserver/ows?service=wms&version=1.1.1&request=GetCapabilities'
    });
    gecui.store.load();
    
    var resourceFormPanel = new gecui.form.ResourceFormPanel( {
        region : 'center',
        margins : '3 3 3 0'
    });

    // TODO: refactor into a base class for context menus
    var onContextmenu = function(node, e) {
        if (node.attributes.iconCls == 'gecui-featuretype') {
            var failure = function(response) {
                Ext.Msg.alert('Status', response.responseText);
            };

            var deleteFeatureType = function() {
                Ext.Ajax.request( {
                    method : 'DELETE',
                    url : node.attributes.resturl,
                    failure : failure
                });
            };

            var menu = new Ext.menu.Menu( {
                items : [ {
                    text : 'Delete',
                    iconCls : 'gecui-delete',
                    handler : deleteFeatureType
                } ]
            });
            menu.showAt(e.getXY());
        }
    };

    var onClick = function(node, e) {
        resourceFormPanel.setResourceFromNode(node);
    };

    var root = new Ext.tree.TreeNode( {
        text : 'Geoserver',
        expanded : true
    });

    root.appendChild( [ new gecui.tree.WorkspacesNode(), new gecui.tree.LayersNode(),
            new gecui.tree.StylesNode() ]);

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
                    fn : onClick
                },
                contextmenu : {
                    fn : onContextmenu
                }
            }
        }, resourceFormPanel ]

    });

};

Ext.onReady(gecui.Application);
