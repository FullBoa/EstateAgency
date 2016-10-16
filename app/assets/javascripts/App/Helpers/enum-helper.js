/**
 * Created by Евгений on 03.06.15.
 */
App.module('Helpers', function (Mod, App, Backbone, Marionette, $, _) {
    var Enums = {
        estate_status : {
            actual :{
                value : 'actual',
                label : 'актуальный',
            },
            archive : {
                value : 'archive',
                label : 'архивный',
            }
        },
        estate_revision_result: {
            for_rent: {
                value : 'for_rent',
                label : 'сдается',
            },
            not_rent_more: {
                value : 'not_rent_more',
                label : 'не сдается'
            },
        },
        account_type: {
            client: {
                value : 'client',
                label : 'Клиент',
            },
            manager: {
                value : 'manager',
                label : 'Менеджер',
            },
            director: {
                value : 'director',
                label : 'Директор',
            },
        },
        sorting_type: {
            default: {
                value : 'actualized_at',
                label : 'По дате обновления',
            },
            cost_asc: {
                value : 'cost_asc',
                label : 'Цена: по возрастанию',
            },
            cost_desc: {
                value : 'cost_desc',
                label : 'Цена: по убыванию',
            },
            footage_asc: {
                value : 'footage_asc',
                label : 'Метраж: по возрастанию',
            },
            footage_desc: {
                value : 'footage_desc',
                label : 'Метраж: по убыванию',
            },
        }
    }

    Mod.Enum = Enums;
});