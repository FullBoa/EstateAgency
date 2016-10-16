App.module('Routing', function (Mod, App, Backbone, Marionette, $, _) {
    'use strict';
    App.Routing.create = function (routes, controller) {
        var Router = Marionette.AppRouter.extend({
            appRoutes: routes
        });
        var routerOptions = _.extend({}, {
            controller: controller
        });
        var router = new Router(_.pick(routerOptions, _.identity));
        App.vent.trigger('routing:started');
        Debug.console.info('Routing started');
        return App.router = router;
    };
});