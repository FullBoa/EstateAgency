App.module('Helpers.Dates', function (Mod, App, Backbone, Marionette, $, _) {

    Mod.momentize = function(dateString){
        return moment(dateString, App.config.dateFormat);
    }

});