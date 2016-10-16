/**
 * Created by Евгений on 30.06.15.
 */
App.module('MainPage', function (Mod, App, Backbone, Marionette, $, _) {
    'use strict';
    Mod.GridLayout = Marionette.LayoutView.extend({
        el: '.c-estates-demo',
        regions: {
            filterRegion : '.c-filter',
            gridRegion : '.c-grid',
            footerRegion : '.c-footer',
        },
        initialize: function(){

        }
    });

    Mod.DemoFilters = App.Estates.Views.EstatesFilters.extend({
        template: '#estates-demo-filters-template',
        onSearch: $.noop,
        getEstateTypesFilter: function(account){
            return function(estate_type){
                return true;
            }
        },
    })

    var GetMoreCell = Backgrid.Cell.extend({
        className:'get-more-link',
        render: function(){
            this.$el.append($('<a>', {
                href: App.Helpers.Url.Mvc.estate.createUrl('redirect', {id : this.model.get('id')}),
                class: 'mdi mdi-arrow-right-bold-circle-outline',
                title: 'Получить подробную информацию'
            }));
            return this;
        }
    });
    var CurrencyCell = Backgrid.Cell.extend({
        className: 'currency'
    });

    var HiddenXsHeader = Backgrid.HeaderCell.extend({
        className: 'hidden-xs'
    });
    var HiddenXsCell = Backgrid.Cell.extend({
        className: 'hidden-xs'
    });
    var HiddenSmCell = Backgrid.Cell.extend({
        className: 'hidden-sm hidden-xs'
    });
    var HiddenSmHeader = Backgrid.HeaderCell.extend({
        className: 'hidden-sm hidden-xs'
    });
    var DescriptionCell = Backgrid.Cell.extend({
        className: ' hidden-xs',
        render: function() {
            this.$el.empty();
            var address = this.model.get('address');
            var footage = this.model.get('footage');
            this.$el.append(address? '<b>' + address +'</b>;<br/>': '');
            this.$el.append(footage? 'Метраж: <b>' + footage +'</b><br/>': '');
            this.$el.append(this.model.get('description'));

            this.$el.on('click', function(){
                this.$el.toggleClass('clear-nowrap')
            }.bind(this));
            return this;
        }
    });

    Mod.DemoGrid = Backgrid.Grid.extend({
        columns: [
            {name: 'city_area', label: 'Район', editable: false, sortable: false, cell: 'string'},
            {name: 'type', label: 'Тип', editable: false, sortable: false, cell: 'string'},
            {name: 'description', label: 'Описание', editable: false, sortable: false, cell: DescriptionCell, headerCell: HiddenXsHeader},
            {name: 'cost', label: 'Цена', editable: false, sortable: false, cell: CurrencyCell},
            {name: '',  editable: false, sortable: false, cell: GetMoreCell},
        ]
    })
})