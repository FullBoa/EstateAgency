/**
 * Created by Евгений on 16.05.15.
 */
App.module('Users.Models', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.User = Backbone.Model.extend({
        initialize : function(settings){
            this.settings = _.extend({}, settings);
        },
        urlRoot: function() {
            return App.Helpers.Url.Api.user.createUrl('get');
        },
        idAttribute: 'id',
    });
    Mod.UsersCollection = App.Models.PageableCollection.extend({
        url: function() {
            return App.Helpers.Url.Api.user.createUrl('get');
        },
        model: Mod.User,
    });
});