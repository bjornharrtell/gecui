/**
 * Form panel that will adapt to supported Geoserver resources
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
        } ]
    }, config));
};

Ext.extend(gecui.form.ResourceFormPanel, Ext.Panel, {
    initResourcePanel : function(href, xtype) {
        var panel = this.items.get(0);

        if (!(panel.getXType() == xtype)) {
            this.removeAll();

            panel = this.add( {
                xtype : xtype
            });

            this.doLayout();
        }

        panel.load( {
            url : href,
            method : 'GET'
        });
    },
    setResourceFromNode : function(node) {
        this.initResourcePanel(node.attributes.resturl, node.attributes.xtype);
    }
});

Ext.reg('gecui-form-resource', gecui.form.ResourceFormPanel);
