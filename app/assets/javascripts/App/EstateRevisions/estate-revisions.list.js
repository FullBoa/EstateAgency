/**
 * Created by Евгений on 06.06.15.
 */
App.module('EstateRevisions.Views', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.EstateRevisionsListItem = App.Views.ItemView.extend({
        template:"#estate-revisions-list-item-template",
        className: 'list-item',
        tagName: 'div',
        ui: {
            removeBtn: '.c-remove',
        },
        events: {
            'click @ui.removeBtn': 'removeRevisionRecord',
        },
        removeRevisionRecord: function(e){
            e.stopPropagation();
            if(confirm('Точно удаляем?')){
                this.model.destroy();
            }
        },
        onRender: function(){
        },
    })

    Mod.EstateRevisionsList = Marionette.CompositeView.extend({
        template:"#estate-revisions-list-template",
        emptyView: App.Views.NoItemsView,
        childViewContainer:  '.c-items',
        childView: Mod.EstateRevisionsListItem,
        ui: {
            newRevisionBtn: '.c-new-revision-btn',
        },
        events: {
            'click @ui.newRevisionBtn': 'createRevision'
        },
        initialize: function(settings){
            this.settings = _.extend({}, settings);
        },
        onRender: function(){

        },
        createRevision: function(){
            var dlg = new App.EstateRevisions.Views.CreateRevisionDialog({
                estateId : this.settings.estateId,
                onAccept: function(model){
                    this.collection.fetch();
                    this.settings.estateModel.set('update_date', model.get('created_at'));
                    this.settings.estateModel.trigger('model:changed');
                }.bind(this),
            });
            App.popup.show(dlg);
        }
    })

});
