/**
 * Created by Евгений on 30.05.15.
 */
App.module('Accounts.Models', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.Account = Backbone.Model.extend({
        initialize : function(settings){
            this.settings = _.extend({}, settings);
        },
        defaults: {
          account_type_enum: 1
        },
        urlRoot: function (){
            return App.Helpers.Url.Api.account.createUrl('getAccount')
        },
        idAttribute: 'id',
    });
    Mod.AccountsCollection = Backbone.Collection.extend({
        initialize : function(settings){
            this.settings = _.extend({}, settings);
        },
        url: function (){
            return App.Helpers.Url.Api.account.createUrl('getList', {userId : this.settings.userId})
        },
        model: Mod.Account,
    });
});