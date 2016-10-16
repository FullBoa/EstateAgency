/**
 * Created by Евгений on 17.05.15.
 */
App.module('Accounts.Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.AccountsListItem = App.Views.ItemView.extend({
        template:"#account-list-item-template",
        className: 'list-item accounts-list-item',
        tagName: 'div',
        ui: {
            removeBtn: '.c-remove',
            estateTypes: '.c-estate-types',
        },
        events: {
            'click @ui.removeBtn': 'removeAccount',
        },
        removeAccount: function(e){
            e.stopPropagation();
            if(confirm('Точно удаляем?')){
                this.model.destroy();
            }
        },
        onRender: function(){
            if(this.model && this.model.get('estate_types')){
                this.ui.estateTypes.text(_.pluck(this.model.get('estate_types'), 'title').join(', '))
            }
        },
    })

    Mod.AccountsList = Marionette.CompositeView.extend({
        template:"#account-list-template",
        emptyView: App.Views.NoItemsView,
        childViewContainer:  '.c-items',
        childView: Mod.AccountsListItem,
        ui: {
            newAccountBtn: '.c-new-account-btn',
        },
        events: {
            'click @ui.newAccountBtn': 'createAccount'
        },
        initialize: function(settings){
            this.settings = _.extend({}, settings);
        },
        onRender: function(){

        },
        createAccount: function(){
            var dlg = new App.Accounts.Views.CreateAccountDialog({
                userId : this.settings.userId,
                onAccept: function(model){
                    this.collection.fetch();
                }.bind(this),
            });
            App.popup.show(dlg);
        }
    })

});
