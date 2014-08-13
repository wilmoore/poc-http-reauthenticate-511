# Http API 511 POC

> A working demo of an HTTP service that emits a 511 status code and inspecting this in the browser via XHR as well as via a non-browser user agent (curl).

## Install

    % npm install

## Starting the service

### Start service with default allowed origin

    % ./server.js
    //=> service running @ http://127.0.0.1:3000/checktoken
    //=> Access-Control-Allow-Origin: http://127.0.0.1:8000

### Start service with custom allowed origin

    % ORIGIN='http://x.x.x.x' ./server.js
    //=> service running @ http://127.0.0.1:3000/status
    //=> Access-Control-Allow-Origin: http://x.x.x.x

## Test the service via Curl

HTTP/1.1 511 Network Authentication Required

    % curl -i http://127.0.0.1:3002/511

    HTTP/1.1 511 Network Authentication Required
    X-Powered-By: koa
    Access-Control-Allow-Origin: http://127.0.0.1:8800
    Access-Control-Allow-Methods: GET,HEAD,PUT,POST,DELETE
    Content-Type: text/plain; charset=utf-8
    Content-Length: 31
    Date: Wed, 13 Aug 2014 16:17:02 GMT
    Connection: keep-alive

    Network Authentication Required

HTTP/1.1 200 OK

    % curl -i http://127.0.0.1:3002/511

    HTTP/1.1 200 OK
    X-Powered-By: koa
    Access-Control-Allow-Origin: http://127.0.0.1:8800
    Access-Control-Allow-Methods: GET,HEAD,PUT,POST,DELETE
    Content-Type: text/plain; charset=utf-8
    Content-Length: 2
    Date: Wed, 13 Aug 2014 16:19:25 GMT
    Connection: keep-alive

    OK

## Test the service via browser XHR (+ cors)

Start a simple HTTP server

    % python -m SimpleHTTPServer

Open the HTML test page

    % open http://127.0.0.1:8000

You should see a result similar to the following screenshot:

![](https://cloudup.com/cihUe4uCuJF+)

