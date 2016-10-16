/**
 * Created by Евгений on 17.05.15.
 */
App.module('Estates.Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.EstatesListItem = App.Views.ItemView.extend({
        template:"#estate-list-item-template",
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
                window.location.href = App.Helpers.Url.Mvc.estate.createUrl('item', {page: this.settings.page, id: this.model.get('id')});
            }.bind(this));

            this.setUpdateMarker();
        },
        setUpdateMarker: function(){
            this.$el.removeClass('red').removeClass('orange');
            var diffDays = moment().diff(App.Helpers.Dates.momentize(this.model.get('update_date')), 'days');
            if(diffDays >= 3 && diffDays < 5) {
                this.$el.addClass('orange');
                return;
            }
            if(diffDays >=5){
                this.$el.addClass('red');
                return
            }
        },
        onDeselect: function(){
            this.$el.removeClass('selected')
        },
        onSelect: function(){
            this.$el.addClass('selected')
        }
    })

    Mod.EstatesList = Marionette.CompositeView.extend({
        template:"#estate-list-template",
        childViewContainer:  '.c-grid-block',
        childView: Mod.EstatesListItem,
        emptyView: App.Views.NoItemsView,
        ui: {
           header: '.c-header',
           footer: '.c-footer'
        },
        events: {
          'click @ui.newEstateBtn': 'newEstate'
        },
        initialize: function(settings){
          this.settings = _.extend({}, settings);
        },
        onRender: function(){
           this.renderFooter()
           this.renderHeader();
        },
        renderFooter: function(){
            var footer = new App.Views.Paginator({
                el: this.ui.footer,
                collection: this.collection,
                pageHandle: Backgrid.Extension.PageHandle.extend({
                    changePage: function(e){
                        e.preventDefault();
                        window.location.href =  App.Helpers.Url.Mvc.estate.createUrl('paged', {page: this.pageIndex});
                    }
                })
            });
        },
        renderHeader: function(){
            /*var filter = new App.Estates.Views.EstatesFilters({
                collection: this.collection,
                el: this.ui.header,
            })
            filter.render();*/
        },
    })
});
