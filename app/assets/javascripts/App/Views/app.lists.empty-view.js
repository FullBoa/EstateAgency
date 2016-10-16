/**
 * Created by Евгений on 21.06.15.
 */
App.module('Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.NoItemsView = App.Views.ItemView.extend({
        template: false,
        className: 'list-empty-message',
        onRender: function(){
            this.$el.text(this.settings.message || this.message)
        },
        message: "Нет записей"
    });
});