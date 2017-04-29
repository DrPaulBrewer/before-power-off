# before-power-off

Calls designated callback on ACPI Power Button event

## Installation

    npm i before-power-off -S

## Initialization

    const beforePowerOff = require('before-power-off');

## Usage

    beforePowerOff(callSomeNamedFunction);

    beforePowerOff(function(){ // stuff to do before power off });

    beforePowerOff( ()=>{ // stuff to do before power off } );

## Features
* Stealthy
  - doesn't do anything until a handler is set
  - cleans up after itself after triggering.
* Can be called multiple times, creating multiple handlers.
* Under the hood.
  - Listens for power button event on  `/var/run/acpid.socket`
  - Emits an event on hidden EventEmitter
  - callbacks are registered internally using `.once()` not `.on()`
  - Cleans up by destroying the socket

## Copyright

Copyright 2017 Paul Brewer <drpaulbrewer@eaftc.com> - Economic and Financial Technology Consulting LLC

## License

Available under the terms of The MIT License


