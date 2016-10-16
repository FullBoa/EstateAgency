/**
 * Created by Евгений on 17.05.15.
 */
App.module('Users.Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.UsersListItem = App.Views.ItemView.extend({
        template:"#user-list-item-template",
        className: 'list-item',
        tagName: 'div',
        ui: {
            removeBtn: '.c-remove',
        },
        events: {
            'click @ui.removeBtn': 'removeEstate',
        },
        modelEvents:{
            'model:select': 'onSelect',
            'model:deselect': 'onDeselect',
            'model:changed': 'render',
        },
        removeEstate: function(e){
            e.stopPropagation();
            if(confirm('Точно удаляем?')){
                this.model.destroy();
            }
        },
        onRender: function(){
            this.$el.on('click', function(){
                this.model.collection.each(function(model){
                    model.trigger('model:deselect');
                });
                this.$el.addClass('selected');
                window.location.href =  App.Helpers.Url.Mvc.user.createUrl('item', {page: this.settings.page, id: this.model.get('id')});
            }.bind(this));
        },

        onDeselect: function(){
            this.$el.removeClass('selected')
        },
        onSelect: function(){
            this.$el.addClass('selected')
        }
    })

    Mod.UsersList = Marionette.CompositeView.extend({
        template:"#user-list-template",
        childViewContainer:  '.c-grid-block',
        emptyView: App.Views.NoItemsView,
        childView: Mod.UsersListItem,
        ui: {
           newUserBtn: '.c-new-user',
           footer: '.c-footer'
        },
        events: {
          'click @ui.newUserBtn': 'newUser'
        },
        initialize: function(settings){
          this.settings = _.extend({}, settings);
        },
        onRender: function(){
            var footer = new App.Views.Paginator({
                el: this.ui.footer,
                collection: this.collection,
                pageHandle: Backgrid.Extension.PageHandle.extend({
                    changePage: function(e){
                        e.preventDefault();
                        window.location.href =  App.Helpers.Url.Mvc.user.createUrl('paged', {page: this.pageIndex});
                    }
                })
            });
        },
        newUser: function(){
            window.location.href = App.Helpers.Url.Mvc.user.createUrl('new');
        }
    })

});
