/**
 * Created by Евгений on 03.06.15.
 */
App.module('Helpers.UI', function (Mod, App, Backbone, Marionette, $, _) {
    var using = {
        sourceTypes : {
            server: 'server',
            enum: 'enum',
        },
        selectDataCash: {}
    }

    var Selects = {
        'estate_type': {
            url: function(){
                return App.Helpers.Url.Api.estate_type.createUrl('get')
            }
        },
        'estate_status': {
            sourceType: using.sourceTypes.enum,
            enum: App.Helpers.Enum['estate_status']
        },
        'estate_revision_result': {
            enum: App.Helpers.Enum['estate_revision_result'],
            sourceType: using.sourceTypes.enum,
        },
        'city_area': {
            url: function(){
                return App.Helpers.Url.Api.city_area.createUrl('get')
            }
        },
        'account_type': {
            enum: App.Helpers.Enum['account_type'],
            sourceType: using.sourceTypes.enum,
        },
        sorting_type : {
            enum: App.Helpers.Enum['sorting_type'],
            sourceType: using.sourceTypes.enum,
        }
    }

    var SelectFiller = function(el){
        this.$el = $(el);
    };
    SelectFiller.prototype.defaultValue = false;
    SelectFiller.prototype.allowEmpty = true;
    SelectFiller.prototype.label = 'title';
    SelectFiller.prototype.value = 'id';
    SelectFiller.prototype.sourceType = using.sourceTypes[1];

    SelectFiller.prototype.fetchValues = function(){
        if(!this.url){
            throw "url must be specified"
        }
        var url =  _.result(this,'url');
        if(using.selectDataCash[url]){
            return new $.Deferred().resolve(using.selectDataCash[url])
        }

        return $.get(url).success(function(response){
            using.selectDataCash[url]= response;
        });
    }

    SelectFiller.prototype.getValues = function(){
        if(this.sourceType == using.sourceTypes[1]){
            return this.fetchValues()
        }
        var deferred = $.Deferred();

    }

    SelectFiller.prototype.parseValues = function(response){
        var items = _.map(response, function(item){
            return {
                label : item[this.label],
                value : item[this.value],
            }
        }, this);
        return items;
    }

    SelectFiller.prototype.parseEnum = function(the_enum){
        var items = _.map(_.keys(the_enum), function(key){
            return {
                label : the_enum[key].label,
                value : the_enum[key].value,
            }
        }, this);
        return items;
    }

    SelectFiller.prototype.fillSelect = function(items){
        this.$el.empty();
        _.each(items, function(item){
            var option = $('<option>', {
                text: item.label,
                value: item.value,
            });
            this.$el.append(option);
        }, this);

        if(this.defaultValue){
            this.$el.val(this.defaultValue);
        }
        else{
            this.$el.prop('selectedIndex', -1);
        }

        if(this.$el[0].sumo){
            this.$el[0].sumo.reload();
        }



    }

    SelectFiller.prototype.fill = function () {
        var deferred = new $.Deferred();
        if(this.sourceType == using.sourceTypes[1]){
            this.fetchValues()
                .done(function(response){
                    this.responseItems = response;
                    this.items = this.parseValues(response);
                    this.fillSelect(this.items);
                    deferred.resolve();
                }.bind(this))
                .fail(function(response){
                    deferred.reject(repomse)
                })
        }
        else {
            if(!this.enum){
                throw 'enum must be specified'
            }
            this.items = this.parseEnum(this.enum);
            this.fillSelect(this.items);
            deferred.resolve();
        }
     return deferred.promise();
    }


    Mod.SelectFiller = SelectFiller;

    Mod.FillSelect = function (selectName, element, options) {
        var promises = [];
        element.each(function () {
            var that = $(this);
            var filler = new App.Helpers.UI.SelectFiller(this);
            var selectDescription = Selects[selectName];
            if(selectDescription){
                _.extend(filler, selectDescription, options);
            }
            promises.push(filler.fill());
            this.filler = filler;
        });

        return $.when.apply($, promises);
    };
})