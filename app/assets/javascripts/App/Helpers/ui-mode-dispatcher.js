/**
 * Created by Евгений on 03.06.15.
 */
App.module('Helpers', function (Mod, App, Backbone, Marionette, $, _) {

    var ModeSelectors = {
        userMode: '.c-user-mode',
        managerMode: '.c-manager-mode'
    };

    var Dispatcher = function(){
        //хак. Юзер менеджер не успевает даже концструктор запустить. Нужно переходить на RequireJS
      //  setTimeout(function(){
            this.setCurrentUiMode($('body'));
     //   }.bind(this), 5000);
    };

    Dispatcher.prototype.setUserMode = function(el){
        el.addClass('apply-user-mode')
        this.currentMode = 'client'
    };

    Dispatcher.prototype.setManagerMode = function(el){
        el.addClass('apply-manager-mode')
        this.currentMode = 'manager'
    };

    Dispatcher.prototype.setCurrentUiMode = function(el){
        if(App.Helpers.UserManager.userIsManager()){
            this.setManagerMode(el);
        }
        else{
            this.setUserMode(el);
        }
    };

    Dispatcher.prototype.isClientMode = function(){
        return !App.Helpers.UserManager.userIsManager();
    }

    Dispatcher.prototype.isManagerMode = function(){
        return App.Helpers.UserManager.userIsManager();
    }

    Mod.UiModeDispatcher = new Dispatcher();

   /* var attachElContent = Marionette.ItemView.prototype.attachElContent;
    Marionette.ItemView.prototype.attachElContent = function(){
        attachElContent.apply(this, arguments);
        Mod.UiModeDispatcher.setCurrentUiMode(this.$el);
        return this;
    }*/

   /* $(window).load(function(){
        Mod.UiModeDispatcher.setCurrentUiMode($('body'));
    });*/
});