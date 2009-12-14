/**
 * Extend Ext.tree.TreeLoader to support RESTful data sources
 * 
 * @constructor
 */
gecui.tree.TreeLoader = function(config) {
    gecui.tree.TreeLoader.superclass.constructor.call(this, Ext.apply( {}, config));
};

Ext.extend(gecui.tree.TreeLoader, Ext.tree.TreeLoader, {
    // if true the node id will be used as rest path instead of params
    restful : undefined,
    requestData : function(node, callback, scope) {
        if (this.fireEvent("beforeload", this, node, callback) !== false) {
            if (this.directFn) {
                var args = this.getParams(node);
                args.push(this.processDirectResponse.createDelegate(this, [ {
                    callback : callback,
                    node : node,
                    scope : scope
                } ], true));
                this.directFn.apply(window, args);
            } else {
                this.transId = Ext.Ajax.request( {
                    method : this.requestMethod,
                    url : this.restful ? (this.dataUrl || this.url) + node.id + '.json'
                            : (this.dataUrl || this.url),
                    success : this.handleResponse,
                    failure : this.handleFailure,
                    scope : this,
                    argument : {
                        callback : callback,
                        node : node,
                        scope : scope
                    },
                    params : this.restful ? undefined : this.getParams(node)
                });
            }
        } else {
            // if the load is cancelled, make sure we notify
            // the node that we are done
            this.runCallback(callback, scope || node, []);
        }
    },
    // override to handle Geoserver REST API nested arrays
    handleResponse : function(response) {
        this.transId = false;
        var a = response.argument;
        var o = Ext.decode(response.responseText);
        for (key in o) {
            o = o[key];
            if (Ext.isString(o)) {
                o = [];
            } else {
                for (key in o) {
                    o = o[key];
                }
            }
        }
        response.responseText = Ext.encode(o);
        this.processResponse(response, a.node, a.callback, a.scope);
        this.fireEvent("load", this, a.node, response);
    }
});