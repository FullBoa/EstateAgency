App.module('Views', function (Mod, App, Backbone, Marionette, $, _) {

    Mod.ModalView = App.Views.ItemView.extend({
        ui: {
            close: '.c-close-dialog',
            popup: '.popup',
            body: '.popup-body'
        },    
        events: {
            'click @ui.close': function(event) {
                this.close(event, null);
            }
        },
        settings: {},
        initialize: function (options) {
            App.Views.ItemView.prototype.initialize.call(this, options);

            $(window).on('resize.modal.' + this.cid, function () {
                this.updatePosition();
            }.bind(this));
        },
        close: function (event, params) {
            this.onClose(params);
            this.$el.hide();
            $(window).off('resize.modal.' + this.cid);
        },
        show: function () {
            App.vent.trigger('modal.show', this);
            var onShow = this.options.onShow || this.onShow || $.noop;
            onShow.call(this);
        },
        updatePosition: function () {
            var popup = _.isString(this.ui.popup) ? this.$(this.ui.popup) : this.ui.popup,
                height = popup.find('.popup-head').outerHeight() + popup.find('.popup-body').outerHeight() + popup.find('.popup-footer').outerHeight(),
                winHeight = $(window).height(),
                minTop = 30,
                defaultTop = 200,
                defaultBottom = 20,
                edge = 10,
                top = (winHeight - height) / 2;

            if (top < defaultTop) {
                top = top < minTop ? minTop : top;
                popup.css('top', top + 'px');
            } else {
                top = defaultTop;
                popup.css('top', defaultTop + 'px');
            }
            if (top + height + defaultBottom >= winHeight) {
                popup.addClass('popup-compressed');
            } else {
                popup.removeClass('popup-compressed');
            }

            if (popup.outerWidth() + edge * 2 >= $(window).width()) {
                popup.addClass('popup-fix-edge');
            } else {
                popup.removeClass('popup-fix-edge');
            }
        },
        onRender: function () {
            this.$el.show();
        },

        onClose: $.noop
    });

    Mod.ConfirmDialog = Mod.ModalView.extend({
        template: '#confirm-dialog-template',
        ui : _.extend(App.Views.ModalView.prototype.ui, {
        }),
        events : _.extend(App.Views.ModalView.prototype.events, {
            'click .c-accept':'onAccept',
        }),
        onRender: function(){
            Mod.ModalView.prototype.onRender.call(this);
            this.ui.body.prepend(this.settings.content || this.content);
        },
        onAccept: function(){
            this.settings.onAccept();
            this.close();
        }
    })

});