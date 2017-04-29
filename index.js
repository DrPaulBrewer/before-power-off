/* Copyright 2017 Paul Brewer, Economic and Financial Technology Consulting LLC <drpaulbrewer@eaftc.com>
 * This file is open source software.  The MIT License applies to this software.
 */

/* jshint esnext:true,eqeqeq:true,undef:true,lastsemic:true,strict:true,unused:true,node:true */

const acpiSocketFile = '/var/run/acpid.socket';
const net = require('net');
const powerEventEmitter = new require('events').EventEmitter();
let acpiSocket;
let connected = 0;

function cleanup(){
    "use strict";
    powerEventEmitter.removeAllListeners();
    acpiSocket.destroy();
    connected = 0;
}

function connect(){
    "use strict";
    connected = 1;
    acpiSocket = net.connect(acpiSocketFile);
    acpiSocket.on('data', function(buf){
	const data = buf.toString().toLowerCase();
	if (data.includes("power") && data.includes("button")){
	    powerEventEmitter.emit('powerbutton');
	    cleanup();
	}
    });
}
    
module.exports = function beforePowerOff(func){
    "use strict";
    powerEventEmitter.once('powerbutton', func);
    if (!connected) connect();
};    
