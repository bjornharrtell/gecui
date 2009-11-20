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
    setResourceFromNode : function(node) {
        var panel = this.items.get(0);

        var xtype =node.attributes.xtype + 'form';
        var text = node.attributes.text;
        
        if (panel.getXType() !== xtype) {
            this.removeAll();

            panel = this.add( {
                node: node,
                xtype: xtype
            });

            this.doLayout();
        }

        panel.load( {
            url : href,
            method : 'GET'
        });
        
        if (xtype === 'gecui-layerform') {
            panel.updateMap(text);
        }
    }
});

Ext.reg('gecui-resourceform', gecui.form.ResourceFormPanel);
