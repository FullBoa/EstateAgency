// ReSharper disable InconsistentNaming
(function (App, Marionette, Renderer, TemplateCache, Mustache) {
    // ReSharper restore InconsistentNaming
    'use strict';

    var loadTemplateBase = TemplateCache.prototype.loadTemplate;
    TemplateCache.prototype.loadTemplate = function (templateId, options) {
         var template = loadTemplateBase(templateId, options);
         return template;
    };

    function compileTemplate(rawTemplate) {
        Mustache.parse(rawTemplate);
        return _.partial(function (rawTemplate, data) {
            data = App.Helpers.Mustache.AddSelectValueLambda(data);
            return Mustache.render(rawTemplate, data);
        }, rawTemplate);
    }

    TemplateCache.prototype.compileTemplate = function (rawTemplate) {
        if (!rawTemplate || !rawTemplate.then) {
            return compileTemplate(rawTemplate);
        }
        return $.when(rawTemplate).pipe(function (template) {
            return compileTemplate(template.content);
        });
    };

    Renderer.render = function (template, data, context) {
            var tmp = $(template).html();
            data = App.Helpers.Mustache.AddSelectValueLambda(data);
            return Mustache.render(tmp, data);
    };

    var baseAttach = Marionette.ItemView.prototype.attachElContent;
    Marionette.ItemView.prototype.attachElContent = function (promise) {
        var self = this;
        $.when(promise).then(function (html) {
            baseAttach.call(self, html);
            self.bindUIElements();
            self.triggerMethod('renderAsync', self);
        });
    };

    App.requireTemplate = function (templates) {
        if (_.isString(templates)) {
            templates = [templates];
        }
        var promises = _.map(templates, function (templateId) {
            return loadTemplateAsync(templateId).done(function (template) {
                TemplateCache.templateCaches[template.id] = template.content;
                Debug.console.info('Загружен шаблон', template.content);
            });
        });

        App.templatesPromise = $.when.apply($, promises);
    };

    App.Renderer = Renderer;

}(App, Backbone.Marionette, Backbone.Marionette.Renderer, Backbone.Marionette.TemplateCache, Mustache));