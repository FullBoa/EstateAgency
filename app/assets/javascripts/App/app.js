
(function (Application, history, Renderer, TemplateCache) {
    'use strict';

    window.App = new Application();

    App.config = {
        dateFormat: 'DD.MM.YYYY',
    };

    $(document).ready(function(){
        App.addRegions({
            body: '.c-main',
            popup: '.c-popup'
        });
    });



})(Backbone.Marionette.Application, Backbone.history, Backbone.Marionette.Renderer, Backbone.Marionette.TemplateCache)