/**
 * Created by Евгений on 16.05.15.
 */
App.module('Estates.Models', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.Estate = Backbone.Model.extend({
        initialize : function(settings){
            this.settings = _.extend({}, settings);
        },
        urlRoot: function() {
            return App.Helpers.Url.Api.estate.createUrl('get');
        },
        idAttribute: 'id',
        defaults: {
            type_id : 1,
            status_enum: 1,
            city_area_id: 1,
        }
    });
    Mod.EstatesCollection = App.Models.PageableCollection.extend({
        url: function() {
            return App.Helpers.Url.Api.estate.createUrl('get');
        },
        model: Mod.Estate,
    });

    Mod.EstatesEemoCollection = App.Models.PageableCollection.extend({
        url: function() {
            return App.Helpers.Url.Api.demo_estate.createUrl('get');
        },
        state: _.extend({}, App.Models.PageableCollection.prototype.state, {
            pageSize: 10,
        }),
    });
});