App.module('Helpers.Mustache', function (Mod, App, Backbone, Marionette, $, _) {

    Mod.AddSelectValueLambda = function(data) {

        var getValue = function (obj, key) {
            return _.reduce(key.split('.'), function (memo, current) {
                return memo ? memo[current] : false;
            }, obj);
        };

        data.selectValue = function () {
            return function(text, render) {
                var arr = text.match(/"(.*?)"/g);
                if (getValue(this, arr[1].replace(/"/g, '')) + '' == arr[0].replace(/"/g, '')) {
                    return text + ' selected';
                }
                return text;
            };
        };
        return data;
    };
});