/**
 * Created by Евгений on 31.05.15.
 */
App.module('Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.SplittedViewLayout = Marionette.LayoutView.extend({
        settings: {
            pageTitle: ''
        },
        regions: {
            listRegion: '.c-list-region',
            headerRegion: '.c-header-region',
            listItemRegion: '.c-list-item-region',
        },
        ui: {
            title: '.c-page-title',
        },
        events: {
        },
        el: '#main-block',
        template: false,
        initialize: function(settings){
            this.settings = _.extend(this.settings, settings);
        },
        initComponents: function(){
            this.bindUIElements();
            this.renderTitle();
            this.renderHeader();
        },
        renderTitle: function(){
            this.ui.title.text(this.settings.pageTitle)
        },
        renderHeader: $.noop,
    });
});