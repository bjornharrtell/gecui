/**
 * @namespace
 */
gecui = {
    /**
     * @member gecui
     */
    version : '0.1.0',
    url : '/geoserver/rest/',
    stylesurl : '/geoserver/styles/',
    failure : function(response) {
        Ext.Msg.alert('Status', response.responseText);
    },
    data : {},
    form : {},
    menu : {},
    node : {},
    tree : {
        loader : {}
    }
};
