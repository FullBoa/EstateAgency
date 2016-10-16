/**
 * Created by Евгений on 04.06.15.
 */
App.module('EstateRevisions.Models', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.EstateRevision = Backbone.Model.extend({
        initialize : function(settings){
            this.settings = _.extend({}, settings);
        },
        defaults: {
            account_id: 1
        },
        urlRoot: function (){
            return App.Helpers.Url.Api.estate_revision.createUrl('getRevision')
        },
        idAttribute: 'id',
    });
    Mod.EstateRevisionsCollection = Backbone.Collection.extend({
        initialize : function(settings){
            this.settings = _.extend({}, settings);
        },
        url: function (){
            return App.Helpers.Url.Api.estate_revision.createUrl('getList', {estateId : this.settings.estateId})
        },
        model: Mod.EstateRevision,
    });
});