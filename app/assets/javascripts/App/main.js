App.vent.on('routing:started', function () {
    if (!Backbone.History.started) {
        console.info('history start');
        Backbone.history.start();
    }
});

$(function () {
    App.start();
});