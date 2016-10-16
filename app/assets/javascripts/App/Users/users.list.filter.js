/**
 * Created by Евгений on 06.06.15.
 */
App.module('Users.Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.UsersFilters = App.Views.ItemView.extend({
        template: '#users-list-filters-template',
        ui: {
            'search': '.c-search'
        },
        onRender: function(){
            this.initFilters();
        },
        initFilters:function(){
            var filterView = new App.Views.CollectionFilter({
                    name: 'search',
                    collection: this.collection,
                    el : this.ui.search,
                    onSearch: function(){
                        window.location.href = App.Helpers.Url.Mvc.user.createUrl('paged', {page: 1});
                    },
                });
            filterView.render();
        },
    })

});
