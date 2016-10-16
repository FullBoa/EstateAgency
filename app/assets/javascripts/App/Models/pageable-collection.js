/**
 * Created by Евгений on 25.05.15.
 */
App.module('Models', function (Mod, App, Backbone, Marionette, $, _) {
    'use strict';

    Mod.PageableCollection = Backbone.PageableCollection.extend({
        state: {
            firstPage: 1,
            pageSize: 15,
        },
        parseRecords: function(response){
            var result = response.result;
            if (!result) {
                return;
            }
            for (var i = 0; i < result.length; i++) { // для колонки №
                result[i]._index = 1 + i + this.state.pageSize * (this.state.currentPage - 1);
            }
            return result;
        },
        parseState: function (response) {
            return { totalRecords: response.totalRecords };
        },
        queryParams: {
            currentPage: "current_page",
            pageSize: "page_size",
            sortKey: "sort",
            order: "direction",
            directions: {
                "-1": "asc",
                "1": "desc"
            }
        }
    });
});

