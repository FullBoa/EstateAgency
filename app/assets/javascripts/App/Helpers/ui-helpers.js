/**
 * Created by Евгений on 02.06.15.
 */
App.module('Helpers.UI', function (Mod, App, Backbone, Marionette, $, _) {
    Mod.initDatepicker = function (element, options) {
        element.each(function () {
            var that = $(this);
            that.datepicker($.extend({}, options));
            options && options.default && that.datepicker('setDate', options.default)
        });
    };

    Mod.initCombobox = function(element, options){
        var defaults = {
            placeholder: '(не выбрано)',
            csvDispCount: 3,
            captionFormat: 'Выбрано {0}',
            selectAll : $(element).prop('multiple'),
            selectAlltext : 'Все'
        };
        $(element).SumoSelect(_.extend(defaults,options));
    };

    Mod.initRangeSlider = function(element, options){
        var defaults = {
            range: {
                min: 0,
                max: 100000,
            },
            start:[0,100000],
            step: 1000,
            connect: true,
            format: {
                to: function ( value ) {
                    return parseInt(value);
                },
                from: function ( value ) {
                    return parseInt(value);
                }
            }
        };
        var $el = $(element);
        $el.noUiSlider(_.extend(defaults, options));
        $el.Link('lower').to($(options.minInput));
        $el.Link('upper').to($(options.maxInput));
        $el.noUiSlider_pips({
            mode: 'range',
            density: 3
        });
    };

    App.confirm = function(content, onAccept){
        var confirmDlg = new App.Views.ConfirmDialog({
            content: content,
            onAccept: onAccept || $.noop,
        })
        App.popup.show(confirmDlg);
    };

    Mod.initScrollbar = function (element, options) {
        var params = _.extend({
            theme: 'dark-thick',
            scrollInertia: 50,
            advanced: {
                updateOnContentResize: true,
                updateOnBrowserResize: true
            },
            mouseWheel:{ preventDefault: true },
            updateOnSelectorChange: "c-scrollbox",
            live: true,
        }, options);
        element.mCustomScrollbar(params);
        return element;
    };

    Mod.initNumeric = function(el){
        $(el).numeric({decimal: false, decimalPlaces: 2})
    };

    Mod.ShowMessage = function (msg, success, onClose) {
        var className = 'msg-popup c-msg-popup';
        if (success) {
            className += ' green';
        }
        var div = $('<div>', {
            'class': className,
        });
        div.append(msg);
        $('body').append(div.click(function (e) {
            e.stopPropagation();
        }));
        if (typeof onClose === 'function') {
            $(document).one('messageClosed', onClose);
        }
    };

    Mod.CloseMessages = function () {
        $('.c-msg-popup').remove();
        $(document).trigger('messageClosed');
    };


    Mod.addInitializer(function () {
        $(document)
            .on('click', Mod.CloseMessages)
            .on('scroll', Mod.CloseMessages);
    });
});