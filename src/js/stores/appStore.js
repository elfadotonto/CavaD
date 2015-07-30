var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/app-constants.js');
var assign = require('react/lib/Object.assign');

var CHANGE_EVENT = 'change';
var page = 'home'

var AppStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    getPage: function () {
        return page;
    },
    setPage: function (newPage) {
        page = newPage;
    },
    addChangeListener: function (callback) { this.on(CHANGE_EVENT, callback); },
    removeChangeListener: function (callback) { this.removeListener(CHANGE_EVENT, callback); },
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case AppConstants.MOVE:
            AppStore.setPage(action.page);
            AppStore.emitChange();
            break;
        default:
            break;
    }

    return true;
});

module.exports = AppStore;