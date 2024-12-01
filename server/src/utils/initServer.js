"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
require("dotenv/config");
var http_1 = require("http");
var express_1 = require("express");
var socket_io_1 = require("socket.io");
var cors_1 = require("cors");
var initServer = function () {
    var app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    var server = (0, http_1.createServer)(app);
    var io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    var port = process.env.NEXT_PUBLIC_PORT;
    server.listen(port, function () {
        console.log("Server running on port ".concat(port));
    });
    return { io: io };
};
exports.initServer = initServer;
