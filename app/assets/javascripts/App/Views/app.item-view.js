/**
 * Created by Евгений on 23.05.15.
 */
App.module('Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.ItemView = Marionette.ItemView.extend({
        settings: {
        },
        initialize: function(settings){
            _.extend(this.settings, settings)
            this.afterInit(this.settings)
        },
        afterInit: function(settings){

        }
    })
});