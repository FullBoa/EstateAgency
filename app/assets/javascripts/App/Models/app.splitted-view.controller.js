/**
 * Created by Евгений on 31.05.15.
 */
App.module('Views', function (Mod, App, Backbone, Marionette, $, _) {
    'use strict';

    Mod.SplittedViewController = Marionette.Controller.extend({
        defaults: {
            entityName: '',
            listViewClass: '',
            listItemViewClass: '',
            entityCollectionClass: '',
            entityModelClass: '',
        },
        settings: {
            layoutViewClass: App.Views.SplittedViewLayout
        },
        initialize: function(settings){
            _.extend(this.settings, settings);
            for (var key in this.defaults){
                if(!settings[key]){
                    throw  key + " must be defined"
                }
            }

            this.pageLayout = new this.settings.layoutViewClass({
                controller: this
            });
        },
        defaultAction: function(){
            this.page = 1;
            window.location.href = App.Helpers.Url.Mvc[this.settings.entityName.toLowerCase()].createUrl('paged', {page: this.page});
        },
        showPageList: function (pageNumber) {
            this.page = pageNumber;

            if(!this.collection){
                this.collection = new this.settings.entityCollectionClass();
                this.pageLayout.initComponents();
            }
            this.collection.state.currentPage = +pageNumber;
            this.listView = new this.settings.listViewClass({
                collection: this.collection,
                childViewOptions: {
                    page: pageNumber,
                }
            });
            this.pageLayout.listRegion.show(this.listView);
            return this.collection.fetch();
        },
        showListItem: function(pageNuber, id){
            if(!this.collection) {
                this.showPageList(pageNuber).success(function(){
                    this.showListItemForm(pageNuber, id);
                }.bind(this));
                return;
            }
            this.showListItemForm(pageNuber, id);
        },
        newListItem: function(){
            this.showListItem(this.page || 1);

        },
        showListItemForm: function(pageNumber, id){
            this.collection.each(function(model){
                model.trigger('model:deselect');
            });
            var model = !id
                ? new this.settings.entityModelClass()
                : this.collection.find(function(model){ return model.get('id') == id; });
            var view = new this.settings.listItemViewClass({
                model: model,
                collection: this.collection,
                page: pageNumber,
            })
            model.trigger('model:select');
            this.pageLayout.listItemRegion.$el.mCustomScrollbar("destroy");
            this.pageLayout.listItemRegion.show(view);
            this.setDetailsPosition();
            $(window).on('scroll resize',function(){
                this.setDetailsPosition()
            }.bind(this));
        },
        setDetailsPosition: function(e){
            var top = $(window).scrollTop();
            console.log('scrolltop - ' + top);
            var menuHeight = $('.main-menu-panel').height();
            var diff = menuHeight - top;

            this.pageLayout.listItemRegion.$el.css('top', diff>0 ? diff: 0);
        },
        redirectToPageable: function(id){
            $.get(App.Helpers.Url.Api.helpers.createUrl('page_number', {
                entity_name: this.settings.entityName,
                page_size: this.settings.entityCollectionClass.prototype.state.pageSize,
                id: id
            })).success(function(response){
                window.location.href = App.Helpers.Url.Mvc[this.settings.entityName.toLowerCase()].createUrl('item', {page: response, id: id});
                }.bind(this));
        },
        renderHeader: $.noop,
    });
});