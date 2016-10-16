App.module('Users', function (Mod, App, Backbone, Marionette, $, _) {
    'use strict';

    Mod.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'defaultAction',
            'page/:pageNumber': 'showPageList',
            'new':'newListItem',
            ':id': 'redirectToPageable',
            'page/:pageNumber/user/:id': 'showListItem',
        }
    });

    Mod.LayoutView = App.Views.SplittedViewLayout.extend({
        settings: _.extend({}, App.Views.SplittedViewLayout.prototype.settings, {
            pageTitle: 'Пользователи'
        }),
        ui: _.extend({}, App.Views.SplittedViewLayout.prototype.ui, {
            newItemBtn: '.c-new-item',
        }),
        events: _.extend({}, App.Views.SplittedViewLayout.prototype.events, {
            'click @ui.newItemBtn': 'newItem'
        }),
        renderHeader: function(){
            var filter = new App.Users.Views.UsersFilters({
                collection: this.settings.controller.collection,
            })
            this.headerRegion.show(filter);
        },
        newItem: function(){
            window.location.href = App.Helpers.Url.Mvc.user.createUrl('new');
        }
    });

    Mod.addInitializer(function () {

        var controller = new App.Views.SplittedViewController({
            entityName: 'User',
            listViewClass: App.Users.Views.UsersList,
            listItemViewClass: App.Users.Views.EditUser,
            entityCollectionClass: App.Users.Models.UsersCollection,
            entityModelClass: App.Users.Models.User,
            layoutViewClass: Mod.LayoutView,
        });

        Mod.router = new Mod.Router({
            controller: controller
        });
        App.vent.trigger('routing:started');
    });
});