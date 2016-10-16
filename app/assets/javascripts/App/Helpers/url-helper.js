/**
 * Created by Евгений on 29.05.15.
 */
App.module('Helpers.Url', function (Mod, App, Backbone, Marionette, $, _) {
    var Url = {
        api : {
            estate : {
                get:'api/estates'
            },
            demo_estate: {
                get:'api/demo_estates'
            },
            estate_type : {
                get: 'api/estate_types'
            },
            city_area: {
                get: 'api/city_areas'
            },
            estate_revision: {
                getList: 'api/estates/{estateId}/estate_revisions',
                getRevision: 'api/estate_revisions'
            },
            user: {
                get:'api/users'
            },
            account: {
                getList: 'api/users/{userId}/accounts',
                getAccount: 'api/accounts'
            },
            helpers: {
                page_number: 'api/helpers/pagenumber'
            }
        },
        mvc : {
            estate :{
                index : 'estates',
                paged : 'estates#page/{page}',
                item :'estates#page/{page}/estate/{id}',
                new : 'estates#new',
                redirect: 'estates#{id}'
            },
            user : {
                index : 'users',
                paged : 'users#page/{page}',
                item : 'users#page/{page}/user/{id}',
                new : 'users#new'
            }
        }
    }

    var createCollectionParam = function (collection, forEach) {
        return _.map(collection, forEach).join('&');
    };

    var createArrayParam = function (name, array) {
        return createCollectionParam(array, function (item) {
            return name + '=' + item;
        });
    };

    var createDictionaryParam = function (name, map) {

        var arrayOfPairs = _.reduce(map, function (memo, value, key) {
            memo.push({
                key: key,
                value: value
            });
            return memo;
        }, []);

        return createCollectionParam(arrayOfPairs, function (item, index) {
            return name + '[' + index + '].Key' + '=' + item.key +
                '&' + name + '[' + index + '].Value' + '=' + item.value;
        });
    };

    var createParam = function (name, value) {
        if (_.isArray(value)) {
            return createArrayParam(name, value);
        } else if (_.isObject(value)) {
            return createDictionaryParam(name, value);
        }
        return name + '=' + value;
    };

    function calculateUrl(method, params) {
        var urlTemplate = this[method];
        if(!urlTemplate){
            throw 'Method ' + method + " doesn't defined"
        }
        var notFoundParams = [];
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var value = params[key];
                var regextText = '({' + key + '})|({' + key + ':[^}]*})';
                var regexp = new RegExp(regextText, 'g');
                var inUrl = regexp.exec(urlTemplate);
                if (!inUrl) {
                    notFoundParams.push({ key: key, value: value });
                    continue;
                }
                urlTemplate = urlTemplate.replace(regexp, value);
            }
        }
        if (notFoundParams.length) {
            urlTemplate += '?';
        }
        var urlParams = [];
        for (var i = 0; i < notFoundParams.length; i++) {
            var param = notFoundParams[i];
            urlParams.push(createParam(param.key, param.value));
        }
        urlTemplate += urlParams.join('&');

        return urlTemplate;
    }
    function bindUrlCreator (urlContainer) {
        for (var controller in urlContainer){
            urlContainer[controller].createUrl = calculateUrl.bind(urlContainer[controller]);
        }
        return urlContainer;
    }

    Mod.Api = bindUrlCreator(Url.api);
    Mod.Mvc = bindUrlCreator(Url.mvc);



});