/**
 * Created by Евгений on 17.05.15.
 */
App.module('Users.Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.EditUser = App.Views.ItemView.extend({
        template: '#edit-user-template',
        className:'details-content',
        tagName: 'form',
        ui: {
            firstName: '.c-first-name',
            lastName: '.c-last-name',
            patronym: '.c-patronym',
            phoneNumber: '.c-phone',
            saveBtn: '.c-save-btn',
            accountsList: '.c-accounts-list',
            form: 'form'
        },
        events: {
            'click @ui.saveBtn':'saveEstate',
            'submit @ui.form':'saveEstate',
        },
        initialize: function(settings){
            this.settings = _.extend({}, settings);
        },
        onRender: function(){
            this.bindUIElements();
        },
        onShow: function(){
            this.accounts = new App.Accounts.Models.AccountsCollection({ userId: this.model.get('id')});
            this.accountsList = new App.Accounts.Views.AccountsList({
                el: this.ui.accountsList,
                collection: this.accounts,
                userId: this.model.get('id'),
            })
            this.accounts.fetch();
            this.accountsList.render();
        },
        saveEstate: function(){
            this.model.set({
                'first_name': this.ui.firstName.val(),
                'last_name': this.ui.lastName.val(),
                'patronym': this.ui.patronym.val(),
                'phone_number': this.ui.phoneNumber.val(),
            })
            this.settings.collection.add(this.model);
            this.model.save()
                .success(function(){
                    App.Helpers.UI.ShowMessage("Сохранено", true);
                    window.location.href = App.Helpers.Url.Mvc.user.createUrl('item', {page: this.settings.page, id: this.model.get('id')});
                }.bind(this));
            this.model.trigger('model:changed');
        },
    })


});