/**
 * Created by Евгений on 17.05.15.
 */
App.module('Estates.Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.EditEstate = App.Views.ItemView.extend({
        template: '#edit-estate-template',
        className:'details-content',
        tagName: 'form',
        ui: {
            form: 'form#estate-edit-form',
            address: '.c-address',
            cost: '.c-cost',
            footage: '.c-footage',
            description: '.c-estate-description',
            ownerName: '.c-owner_name',
            ownerPhone: '.c-owner_phone',
            estateType: '.c-estate_type',
            statusEnum: '.c-estate_status',
            cityArea: '.c-city-area',
            revisionsList: '.c-estate-revisions',
            saveBtn: '.c-save-btn'
        },
        events: {
          'click @ui.saveBtn':'saveEstate',
          'submit @ui.form' : 'saveEstate',
        },
        initialize: function(settings){
            this.settings = _.extend({}, settings);
        },
        onRender: function(){
            this.bindUIElements();
            this.initComoboxes();
            this.createRevisionsList();
            this.initNumerics();

        },
        initComoboxes: function(){
            if(!App.Helpers.UiModeDispatcher.isManagerMode()){
                return;
            }

            App.Helpers.UI.initCombobox(this.ui.estateType);
            App.Helpers.UI.initCombobox(this.ui.statusEnum);
            App.Helpers.UI.initCombobox(this.ui.cityArea);

            App.Helpers.UI.FillSelect('estate_type', this.ui.estateType, {
                defaultValue: this.model.get('type_id')
            });

            App.Helpers.UI.FillSelect('city_area', this.ui.cityArea, {
                defaultValue: this.model.get('city_area_id')
            });

            App.Helpers.UI.FillSelect('estate_status', this.ui.statusEnum, {
                defaultValue: this.model.get('status_enum')
            });
        },
        createRevisionsList: function(){
            if(!App.Helpers.UiModeDispatcher.isManagerMode()){
                return;
            }

            this.revisions = new App.EstateRevisions.Models.EstateRevisionsCollection({ estateId: this.model.get('id')});
            this.revisionsList = new App.EstateRevisions.Views.EstateRevisionsList({
                el: this.ui.revisionsList,
                collection: this.revisions,
                estateId: this.model.get('id'),
                estateModel: this.model,
            });
            this.revisions.fetch();
            this.revisionsList.render();
        },
        initNumerics: function(){
            App.Helpers.UI.initNumeric(this.ui.footage);
            App.Helpers.UI.initNumeric(this.ui.cost);
        },
        saveEstate: function(e){
            e.preventDefault();
            e.stopPropagation();
            this.model.set({
                'address': this.ui.address.val(),
                'cost': this.ui.cost.val(),
                'footage': this.ui.footage.val(),
                'description': this.ui.description.val(),
                'owner_name': this.ui.ownerName.val(),
                'owner_phone': this.ui.ownerPhone.val(),
                'type_id': this.ui.estateType.val(),
                'status_enum': this.ui.statusEnum.val(),
                'city_area_id': this.ui.cityArea.val(),
            });
            var me = this;
            var wasNew = this.model.isNew();
            if(wasNew){
                this.checkDuplicates().done(function(response){
                    if(response.result.length){
                        App.confirm(me.buildConfirmContent(response.result), function(){
                            me.realSave(wasNew);
                        });
                    }
                    else{
                        me.realSave(wasNew);
                    }
                })
            }
            else {
                me.realSave(wasNew);
            }
        },
        checkDuplicates: function(){
            return $.ajax({
                method: 'GET',
                url: App.Helpers.Url.Api.estate.createUrl('get', {owner_phone: this.model.get('owner_phone')})
            })
        },
        buildConfirmContent: function(items){
            var content  = $('<span>', {
                text: 'На указанный номер телефона уже заведены объекты:'
            });
            _.each(items, function(item){
                content.append('<br/>')
                content.append($('<a>', {
                    text: item.type + " " + item.city_area,
                    href: App.Helpers.Url.Mvc.estate.createUrl('item', { page: 1, id: item.id}),
                    target: '_blank'
                }))
            }, this);
            return content;
        },
        realSave: function(wasNew){
            this.model.save()
                .success(function(){
                    if(wasNew){
                        this.settings.collection.add(this.model, {at:0});
                    }
                    App.Helpers.UI.ShowMessage("Сохранено", true);
                    this.model.trigger('model:changed');
                    window.location.hash = 'page/' + this.settings.page + '/estate/' + this.model.get('id');
                }.bind(this));
        }
    })
});