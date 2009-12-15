/**
 * Form panel that will adapt to supported Geoserver resources
 * 
 * An inner panel called resource panel is created per resource type
 * 
 * @constructor
 */
gecui.form.ResourceFormPanel = function(config) {
    gecui.form.ResourceFormPanel.superclass.constructor.call(this, Ext.apply( {
        border : false,
        defaults : {
            border : false
        },
        layout : 'fit',
        items : [ {
            border : true,
            xtype : 'form'
        } ],
        /* Current inner panel representing a Geoserver resource */
        resourcePanel : undefined
    }, config));
};

Ext.extend(gecui.form.ResourceFormPanel, Ext.Panel, {
    /**
     * Initialize resource panel
     * 
     * @param node
     *            passed to Resource panels, some update it
     * @param xtype
     *            xtype of the Resource panel to be created
     * @param url
     *            URL to the Geoserver resource
     * @param name
     *            name of the Geoserver resource (used to update map layer)
     */
    initResourcePanel : function(node, xtype, url, name) {
        /* clear form if no or wrong xtype is specified */
        if (Ext.ComponentMgr.isRegistered(xtype) === false) {
            this.removeAll();
            this.doLayout();
            return;
        }

        this.resourcePanel = this.items.get(0);

        /* clear form and create new resourcePanel to replace the old one */
        if (this.resourcePanel === undefined || this.resourcePanel.getXType() !== xtype) {
            this.removeAll();

            this.resourcePanel = this.add( {
                node : node,
                xtype : xtype
            });

            this.doLayout();
        }

        this.loadResourcePanel(url);

        /* update map on layer resource panels */
        if (xtype === 'gecui-layerform') {
            this.resourcePanel.updateMap(name);
        }
    },
    /**
     * Loads resource data from Geoserver REST into current resource panel
     */
    loadResourcePanel : function(url) {
        this.resourcePanel.load( {
            url : url,
            method : 'GET'
        });
    },
    /**
     * Use data from a tree node to initialize a resource panel
     */
    setResourceFromNode : function(node) {
        var xtype = node.attributes.xtype + 'form';
        var url = node.attributes.resturl;
        var name = node.attributes.text;
        this.initResourcePanel(node, xtype, url, name);
    }
});

Ext.reg('gecui-resourceform', gecui.form.ResourceFormPanel);
