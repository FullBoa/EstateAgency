/**
 * Created by Евгений on 26.05.15.
 */
App.module('Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.Paginator = Backgrid.Extension.Paginator.extend({
        goBackFirstOnSort: false,
        windowSize: 10,
        slideThisMuch: function (firstPage, lastPage, currentPage, windowSize, slideScale) {
            if (lastPage - currentPage < windowSize) {
                return -(~~(currentPage / windowSize) * windowSize - lastPage + windowSize - 1);
            }
            return ~~(windowSize * slideScale);
        },
        slideMaybe : function (firstPage, lastPage, currentPage, windowSize, slideScale) {
            if (lastPage - currentPage < windowSize && lastPage >= windowSize) {
                return 1;
            }
            if (lastPage < windowSize) {
                return 0;
            }
            return Math.round(currentPage % windowSize / windowSize);
        }
    });
});