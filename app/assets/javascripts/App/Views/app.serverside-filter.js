App.module('Views', function (Mod, App, Backbone, Marionette, $, _) {
    'use strict';
    Mod.CollectionFilter = Backgrid.Extension.ServerSideFilter.extend({
        template: false,
        delay: 300,
        initialize: function(options){
            Backgrid.Extension.ServerSideFilter.prototype.initialize.apply(this, arguments)
            this.settings = _.extend({}, options);
        },
        onSearch: function () {
            var searchBox = this.searchBox();
            if (!searchBox.val()) { // clear action
                this.search();
            }
        },
        searchBox: function(){
            return this.$el
        },
        render: function(){
            this.addChangeListener();
            this.onRender();
            return this;
        },
        addChangeListener: function(){
            this.searchBox().addClass('c-search-control').doneChanging(function(){
                this.search();
                this.settings.onSearch();
            }, this.delay, this);
        },
        onRender: $.noop
    })
});

(function( $ ){
    $.fn.doneChanging = function(callback, delay, context) {
        this.each(function(){
            var changeTimeout;
            var $this = $(this);
            $this.on('change', function(){
                clearTimeout(changeTimeout);
                changeTimeout = setTimeout(function(){
                    callback.call(context || $this);
                }, delay);
            });
        })
        return this;
    };
})( jQuery );