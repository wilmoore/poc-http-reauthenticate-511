#!/usr/bin/env node --harmony

var koa = require('koa');
var http = require('http');
var cors = require('koa-cors');
var router = require('koa-router');

// configuration
var protocol = 'http:';
var hostname = '127.0.0.1';
var port = process.env.PORT || 3002;
var origin = process.env.ORIGIN || 'http://127.0.0.1:8000';

// configure service components
var app = koa();
app.use(cors({ origin: origin }));
app.use(router(app));

var strings = {
   already_bound: hostname + ':' + port + ' is already bound.',
   unknown_error: function (message) { return 'Unknown Error: ' + message; }
}

app.get('/511', function* (next) {
   this.status = 511;
   yield next;
});

app.get('/200', function* (next) {
   this.status = 200;
   yield next;
});

// create server.
var server = http.createServer(app.callback());

// start server (listen for connections).
server.listen(port, function () {
   console.log('service running @ ' + protocol + '//' + hostname + ':' + port);
   console.log('Access-Control-Allow-Origin: %s', origin);
});

// handle startup errors.
server.on('error', function (e) {
   var message = e.errno === 'EADDRINUSE' ? strings.already_bound : strings.unknown_error(e.message);
   console.log("ERROR:", message);
});

