/*jslint vars: true, nomen: true, plusplus: true */
/*global define, brackets, $ */
define(function (require, exports, module) {
    "use strict";

    // Brackets modules
    var KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
        CommandManager    = brackets.getModule("command/CommandManager");

    // Local modules
    var Channel           = require("src/utils/Channel"),
        Events            = require("src/utils/Events"),
        C                 = require("src/utils/Constants"),
        S                 = require("strings");

    /**
     * All Commands registered are given this callback which channels the CMD_ID
     * to the Extension-wide Radio Channel. Any Object responsible for complying
     * to the command must listen to the desired CMD_ID on the Extension-wide
     * Radio Channel.
     */
    function command() {
        /*jshint validthis: true */
        Channel.Extension.command(this._id);
    }

    function request(data) {
        return $.ajax({
            type : "POST",
            url  : C.QUERY_URL,
            data : JSON.stringify(data)
        });
    }

    function registerCommandsAndKeyBindings() {

        CommandManager.register(S.CMD_HIDE_ZOTERO_PANEL,     Events.CMD_HIDE_PANEL,      command);
        CommandManager.register(S.CMD_TOGGLE_ZOTERO_PANEL,   Events.CMD_TOGGLE_PANEL,    command);

        CommandManager.register(S.CMD_INSERT_CITATION,       Events.CMD_INSERT_CITE,     command);
        CommandManager.register(S.CMD_INSERT_BIBLIOGRAPHY,   Events.CMD_INSERT_BIBLIO,   command);
        CommandManager.register(S.CMD_GENERATE_BIBLIOGRAPHY, Events.CMD_GENERATE_BIBLIO, command);

        CommandManager.register(S.CMD_ZOTERO_SETTINGS,       Events.CMD_SHOW_SETTINGS,   command);
        CommandManager.register(S.CMD_CLEAR_ALL_RESULTS,     Events.CMD_CLEAR_ALL,       command);

        KeyBindingManager.addBinding(Events.CMD_TOGGLE_PANEL,    C.KBD_TOGGLE_PANEL);

    }

    module.exports = {
        registerCommandsAndKeyBindings : registerCommandsAndKeyBindings,
        request                        : request
    };

});
