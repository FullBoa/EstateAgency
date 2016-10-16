/**
 * Created by Евгений on 15.05.15.
 */

App.module('Helpers', function (Mod, App, Backbone, Marionette, $, _) {
    'use strict';

    var PageScroller = function(selector, views){
        this.$scroller = $(selector);
        this.pages =[];
        if(views && views.length){
            _.each(views, function(view){
                this.addView(view);
            }, this)
        }
    }

    //viewDescription like { view: MarionetteView, hash: #example}
    PageScroller.prototype.addView = function(viewDescription){
        if(!viewDescription.view){
            throw "view is null"
        }
        if(!viewDescription.hash) {
            throw "hash is null"
        }
        this.pages.push(viewDescription);
    }
    PageScroller.prototype.init = function(){
        
    }

});