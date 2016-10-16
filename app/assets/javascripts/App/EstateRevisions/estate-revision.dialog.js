/**
 * Created by Евгений on 04.06.15.
 */
App.module('EstateRevisions.Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.CreateRevisionDialog = App.Views.ModalView.extend({
        template: '#create-revision-dialog-template',
        ui : _.extend(App.Views.ModalView.prototype.ui, {
            createdAt : '.c-created-at',
            result: '.c-result',
        }),
        events : _.extend(App.Views.ModalView.prototype.events, {
            'click .c-accept':'onAccept',
        }),
        onShow: function(){
            App.Helpers.UI.initDatepicker(this.ui.createdAt, { default: moment().format(App.config.dateFormat)});
            App.Helpers.UI.initCombobox(this.ui.result);
            App.Helpers.UI.FillSelect('estate_revision_result', this.ui.result);
        },
        onAccept: function(){
            var model = new App.EstateRevisions.Models.EstateRevision()
            model.set({
                account_id: 1,
                estate_id: this.settings.estateId,
                created_at: this.ui.createdAt.val(),
                result_enum: this.ui.result.val(),
            });
            model.save().success(function(){
                App.Helpers.UI.ShowMessage('Сохранено', true);
                this.settings.onAccept(model);
            }.bind(this));
            this.close()
        }
    })
});