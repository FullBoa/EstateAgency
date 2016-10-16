/**
 * Created by Евгений on 06.06.15.
 */
App.module('Estates.Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.EstatesFilters = App.Views.ItemView.extend({
        template: '#estates-list-filters-template',
        ui: {
            'estateType': '.c-estate-type-filter',
            'cityArea': '.c-city-area-filter',
            'costMin': '.c-cost-min-filter',
            'costMax': '.c-cost-max-filter',
            'status': '.c-status',
            'orderByType': '.c-order-by-type',
            'selects': 'select',
            'costSlider': '.c-cost-slider',
            'footageMin': '.c-min-footage',
            'footageMax': '.c-max-footage',
            'orderBy': '.c-order-by',
        },
        onRender: function(){
            this.fillSelects();
            this.initCostSlider();
            this.initNumerics();
            this.initFilters();
        },
        initCostSlider: function(){
            App.Helpers.UI.initRangeSlider(this.ui.costSlider, {
                minInput: this.ui.costMin,
                maxInput: this.ui.costMax,
            })

            //hacks begins
            var previousMin = this.ui.costMin.val();
            var previousMax = this.ui.costMax.val();
            this.ui.costSlider.on('change', function(){
                this.onSearch();
                if(this.ui.costMax.val() != previousMax){
                    this.ui.costMax.trigger('change')
                }
                if(this.ui.costMin.val() != previousMin){
                    this.ui.costMin.trigger('change')
                }
                previousMax = this.ui.costMax.val();
                previousMin = this.ui.costMin.val();
            }.bind(this));

        },
        initNumerics: function(){
            App.Helpers.UI.initNumeric(this.ui.footageMax);
            App.Helpers.UI.initNumeric(this.ui.footageMin);
        },
        fillSelects : function(){
            var me = this;
            App.Helpers.UI.initCombobox(this.ui.estateType, {placeholder: 'Тип объекта'});
            App.Helpers.UI.initCombobox(this.ui.status, {placeholder: 'Статус'});
            App.Helpers.UI.initCombobox(this.ui.cityArea, {placeholder: 'Район города'});
            App.Helpers.UI.initCombobox(this.ui.orderBy);
            App.Helpers.UserManager.accountReady().done(function(){
                App.Helpers.UI.FillSelect('estate_type', me.ui.estateType, {
                    parseValues: function(response){
                        var items = _.filter(response, me.getEstateTypesFilter());
                        return this.constructor.prototype.parseValues(items);
                    }
                });
            });
            App.Helpers.UI.FillSelect('estate_status', this.ui.status);
            App.Helpers.UI.FillSelect('city_area', this.ui.cityArea);
            App.Helpers.UI.FillSelect('sorting_type', this.ui.orderBy);
        },
        getEstateTypesFilter: function(account){
            var availableTypes = App.Helpers.UserManager.availableEstateTypesIds();
            return function(estate_type){
                return !availableTypes || _.contains(availableTypes, estate_type.id);
            }
        },
        onSearch: function(){
            window.location.href = App.Helpers.Url.Mvc.estate.createUrl('paged', {page: 1});
        },
        initFilters:function(){
            var filters = [
                { name: 'estate_type', el: this.ui.estateType},
                { name: 'cost_min', el: this.ui.costMin},
                { name: 'cost_max', el: this.ui.costMax},
                { name: 'city_area', el: this.ui.cityArea},
                { name: 'status', el: this.ui.status},
                { name: 'footage_min', el: this.ui.footageMin},
                { name: 'footage_max', el: this.ui.footageMax},
                { name: 'order_by', el: this.ui.orderBy}
            ];

            _.each(filters, function(filter){
                var options = {
                    collection: this.collection,
                    onSearch: this.onSearch.bind(this),
                };
                var filterView = new App.Views.CollectionFilter(_.extend(filter,options))
                filterView.render();
            }, this);
        },
    })

});
