/**
 * Created by Евгений on 27.06.15.
 */
App.module('MainPage', function (Mod, App, Backbone, Marionette, $, _) {
    'use strict';
    var using = {
        firstPage: '#first-page',
        secondPage: '#second-page',
        thirdPage: '#third-page',
    };



    Mod.addInitializer(function(){
        this.layout = new Mod.GridLayout();
        this.collection = new App.Estates.Models.EstatesEemoCollection();

        this.grid = new  Mod.DemoGrid({
            collection: this.collection
        });
        this.layout.gridRegion.show(this.grid);

        this.filters = new Mod.DemoFilters({
            collection: this.collection,
        });
        this.layout.filterRegion.show(this.filters);

        this.footer = new App.Views.Paginator({
            collection: this.collection,
        });
        this.layout.footerRegion.show(this.footer);

        this.collection.fetch();

        $('.to-demo-link').on('click', function(){
            scrollTo(using.secondPage)
        });
        $('#to-start-href').on('click', function(){
            scrollTo(using.firstPage)
        });

    });


    function scrollTo (element) {
        var $el = $(element);
        var to = $el.offset().top;
        $('html, body').animate({
            scrollTop: to,
        }, 800)
     //   using.scroller.animateTo(to, {duration: 800, easing : 'swing'})
    }

    function setPagesSize(){
        var screenHeight = $(window).height();
        $('#first-page').height(screenHeight);
    }

    $(document).ready(function(){
        setPagesSize();
      /*  using.scroller = skrollr.init({
            easing : 'swing',
            smoothScrollingDuration: 0
        });*/
    });
    $(window).on('resize', setPagesSize);

})