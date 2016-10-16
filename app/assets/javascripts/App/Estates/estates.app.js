App.module('Estates', function (Mod, App, Backbone, Marionette, $, _) {
    'use strict';

    Mod.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'defaultAction',
            'page/:pageNumber': 'showPageList',
            'new':'newListItem',
            ':id': 'redirectToPageable',
            'page/:pageNumber/estate/:id': 'showListItem',
        }
    });

    Mod.LayoutView = App.Views.SplittedViewLayout.extend({
        settings: _.extend({}, App.Views.SplittedViewLayout.prototype.settings, {
            pageTitle: 'Объекты'
        }),
        ui: _.extend({}, App.Views.SplittedViewLayout.prototype.ui, {
            newEstateBtn: '.c-new-item',
        }),
        events: _.extend({}, App.Views.SplittedViewLayout.prototype.events, {
            'click @ui.newEstateBtn': 'newEstate'
        }),
        renderHeader: function(){
            var filter = new App.Estates.Views.EstatesFilters({
                collection: this.settings.controller.collection,
                el: this.ui.header,
            })
            this.headerRegion.show(filter);
        },
        newEstate: function(){
            window.location.href = App.Helpers.Url.Mvc.estate.createUrl('new');
        }
    });

    Mod.addInitializer(function () {

        var controller = new App.Views.SplittedViewController({
            entityName: 'Estate',
            listViewClass: App.Estates.Views.EstatesList,
            listItemViewClass: App.Estates.Views.EditEstate,
            entityCollectionClass: App.Estates.Models.EstatesCollection,
            entityModelClass: App.Estates.Models.Estate,
            layoutViewClass: Mod.LayoutView,
        });

        Mod.router = new Mod.Router({
            controller: controller
        });
        App.vent.trigger('routing:started');
    });
});