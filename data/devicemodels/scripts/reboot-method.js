// Copyright (c) Microsoft. All rights reserved.

/*global log*/
/*global updateState*/
/*global sleep*/
/*jslint node: true*/

"use strict";

// Default state
var state = {
    // reboot just changes whether the device is on or offline
    online: true
};

/**
 * Entry point function called by the method.
 *
 * @param context        The context contains current time, device model and id
 * @param previousState  The device state since the last iteration
 */
/*jslint unparam: true*/
function main(context, previousState) {

    // Reboot - devices goes offline and comes online after 20 seconds
    log("Executing reboot simulation function.");

    state.DeviceMethodStatus = "Rebooting device...";
    state.CalculateRandomizedTelemetry = false;
    state.online = false;
    // update the state to offline
    updateState(state);

    // Sleep for 20 seconds
    sleep(20000);

    state.DeviceMethodStatus = "Successfully rebooted device.";
    state.CalculateRandomizedTelemetry = true;
    state.online = true;
    // update the state back to online
    updateState(state);

}
