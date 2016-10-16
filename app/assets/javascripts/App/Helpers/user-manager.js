/**
 * Created by Евгений on 03.06.15.
 */
App.module('Helpers', function (Mod, App, Backbone, Marionette, $, _) {
    var _account = {};

    var Manager = function(){
        var cookie  = getCookie('account')
        _account = JSON.parse(cookie || "{}");
        this.accountPromise = $.Deferred();
        if(cookie != null){
            $.get('/' + App.Helpers.Url.Api.account.createUrl('getAccount') + '/' + _account.id)
                .success(function(response){
                    _.extend(_account, response);
                    this.accountPromise.resolve(_account);
                }.bind(this));
        }
        else {
            this.accountPromise.resolve(null);
        }
    };

    Manager.prototype.currentUser = function(){
        return _account;
        /*return {
            //type : 'client',
            type : 'manager'
        }*/
    };
    Manager.prototype.accountReady = function(){
        return this.accountPromise;
    };

    Manager.prototype.userIsInRole = function (role){
        var user = this.currentUser();
        return user && user.type == role
    };

    Manager.prototype.userIsManager = function () {
        return this.userIsInRole('manager') || this.userIsInRole('director');
    };

    Manager.prototype.availableEstateTypesIds = function(role) {
        if(Manager.prototype.userIsManager()){
            return null;
        }
        return _.pluck(_account.estate_types, 'id');
    };

    Mod.UserManager = new Manager();

    // возвращает cookie с именем name, если есть, если нет, то undefined
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

});