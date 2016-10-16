/**
 * Created by Евгений on 06.06.15.
 */
App.module('Accounts.Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.CreateAccountDialog = App.Views.ModalView.extend({
        template: '#create-account-template',
        ui : _.extend(App.Views.ModalView.prototype.ui, {
            datepickers : '.datepicker',
            startDate : '.c-start-date',
            duration: '.c-duration',
            accountType: '.c-account-type',
            estateTypes: '.c-estate-types',
            accountCost: '.c-account-cost',
        }),
        events : _.extend(App.Views.ModalView.prototype.events, {
            'click .c-accept':'onAccept',
            'change @ui.estateTypes': 'calcAccountCost',
            'change @ui.accountType': 'onAccountTypeChange',
        }),
        onShow: function(){
            App.Helpers.UI.initDatepicker(this.ui.datepickers);
            App.Helpers.UI.initCombobox(this.ui.estateTypes);
            App.Helpers.UI.initCombobox(this.ui.accountType);
            App.Helpers.UI.initCombobox(this.ui.duration);
            this.ui.duration.on('change', function(){
                this.calcAccountCost();
            }.bind(this));

            App.Helpers.UI.FillSelect('estate_type', this.ui.estateTypes).done(function(){
                this.allEstateTypes = this.ui.estateTypes[0].filler.responseItems;
                this.onAccountTypeChange();
            }.bind(this));
            App.Helpers.UI.FillSelect('account_type', this.ui.accountType);

        },
        calcAccountCost: function(){
            var selectedEstateTypes = this.ui.estateTypes.val() || [];
            var types = _.filter(this.allEstateTypes,function(type){
                    return _.contains(selectedEstateTypes, type.id.toString());
                })

            var maxCostType = types.length ? _.max(types, function(type){
                    return type.client_cost
                }): 0;

            this.ui.accountCost.val(+this.ui.duration.val() * (maxCostType ? maxCostType.client_cost : 0));
        },
        onAccountTypeChange: function(){
            var accountType = this.ui.accountType.val();
            this.toggleFieldsByAccountType(accountType);
        },
        toggleFieldsByAccountType: function(accountType){
            switch (accountType){
                case App.Helpers.Enum.account_type.manager.value:
                    this.ui.startDate.val(null);
                    this.ui.startDate.parents('.c-field').hide();
                    this.ui.duration.val(null);
                    this.ui.duration.parents('.c-field').hide();
                    this.ui.estateTypes.val(null);
                    this.ui.estateTypes.parents('.c-field').hide();
                    this.ui.accountCost.val(null);
                    this.ui.accountCost.parents('.c-field').hide();
                    break;
                case App.Helpers.Enum.account_type.client.value:
                default :
                    this.ui.startDate.parents('.c-field').show();
                    this.ui.duration.parents('.c-field').show();
                    this.ui.estateTypes.parents('.c-field').show();
                    this.ui.accountCost.parents('.c-field').show();
                    break;
            }
        },
        onAccept: function(){
            var model = new App.Accounts.Models.Account()
            var endDate = moment(this.ui.startDate.val(), App.config.dateFormat).add({months: +this.ui.duration.val()}).format(App.config.dateFormat);
            model.set({
                user_id: this.settings.userId,
                start_date: this.ui.startDate.val(),
                end_date: endDate,
                account_type_enum: this.ui.accountType.val(),
                estate_types: this.ui.estateTypes.val() || [],
                client_cost: this.ui.accountCost.val(),
            });
            model.save().success(function(){
                App.Helpers.UI.ShowMessage('Сохранено', true);
                this.settings.onAccept(model);
            }.bind(this));
            this.close()
        }
    })
})