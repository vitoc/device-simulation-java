[![Issues][issues-badge]][issues-url]
[![Gitter][gitter-badge]][gitter-url]

Device Simulation Overview
==========================

This service allows management of a pool of simulated devices. The service
helps test the end-to-end flow of IoT applications. The service simulates
devices that send device-to-cloud (D2C) telemetry and allows cloud-to-device
(C2D) methods to be invoked by application connected IoT Hub.

The service provides a RESTful endpoint to configure the simulation details,
to start and stop the simulation, to add and remove virtual devices. The
simulation is composed by a set of virtual devices, of different **models**,
each sending telemetry and replying to method calls.

Each **device model** defines a distinct behavior, like the data generated
by virtual sensors, frequency and format of the telemetry, network protocols,
which methods are supported.

<img src="https://github.com/Azure/device-simulation-java/blob/master/docs/overview.png">

Dependencies
============

The simulation service depends on:

* [Azure IoT Hub][iothub-url] used to store virtual devices, to send
  telemetry and receive method calls
* [Storage adapter microservice][storageadapter-url] used to store the
  simulation details
* Configuration settings to connect to IoT Hub and the Storage Adapter.
  These settings are stored in environment variables, which are referenced
  by the service configuration.

How to use the microservice
===========================

## Quickstart - Running the service with Docker

1. Create an instance of [Azure IoT Hub][iothub-url]
1. Find your Iot Hub connection string. See
   [Understanding IoTHub Connection Strings][iothubconnstring-url] if you
   need help finding it.
1. Store the "IoT Hub Connection string" in the [env-vars-setup](env-vars-setup)
   (or [env-vars-setup.cmd](env-vars-setup.cmd)) script.
1. [Install Docker Compose][docker-compose-install-url]
1. Start the Simulation service using Docker Compose, open a console and run:
   ```
   cd device-simulation-java
   env-vars-setup
   docker-compose up
   ```
1. Use an HTTP client such as [Postman][postman-url], to exercise the
   [RESTful API][wiki-createsim-url] to create a simulation.

## Project Structure

The project source code is currently available only in C# and hosted in
[GitHub](https://github.com/Azure/device-simulation-dotnet). However, you
won't need to edit the service code to create custom simulations, because
device models and simulation logic are defined using JSON and Javascript,
and stored in the [devicemodels](data/devicemodels) folder:

* **data/devicemodels/*.json**: a set of pre-configured device models. Each JSON
  file defines the properties and behavior of the model. You can add new files
  to define custom device models.
* **data/devicemodels/scripts/*.js**: a set of Javascript files, referenced by
  the device models JSON files. The scripts contain the actual logic used to
  simulate each model.

The existing device models can be customized (and deleted if you don't need
them), and it's quite simple to model a new scenario adding new files. The
service automatically finds the files at start, so there is no need to compile
the original source code, just restart the service after changing the data
folder content.

For more information about device models, see the
[Simulation service wiki](wiki/Device-Models).

Other resources
===============

* [Device Models specification](wiki/Device-Models)
* [Simulation service API specs](wiki/%5BAPI-Specifications%5D-Service)
* [Device Models API specs](wiki/%5BAPI-Specifications%5D-Device-Models)
* [Simulations API specs](wiki/%5BAPI-Specifications%5D-Simulations)

Contributing to the solution
============================

Please follow our [contribution guidelines](CONTRIBUTING.md).  We love PRs too.

Troubleshooting
===============

{TODO}

Feedback
==========

Please enter issues, bugs, or suggestions as GitHub Issues here: https://github.com/Azure/device-simulation-java/issues.





[issues-badge]: https://img.shields.io/github/issues/azure/device-simulation-java.svg
[issues-url]: https://github.com/azure/device-simulation-java/issues
[gitter-badge]: https://img.shields.io/gitter/room/azure/iot-pcs.js.svg
[gitter-url]: https://gitter.im/azure/iot-pcs
[iothub-url]: https://azure.microsoft.com/services/iot-hub
[storageadapter-url]: https://github.com/Azure/pcs-storage-adapter-java/blob/master/README.md
[iothubconnstring-url]: https://blogs.msdn.microsoft.com/iotdev/2017/05/09/understand-different-connection-strings-in-azure-iot-hub
[postman-url]: https://www.getpostman.com
[wiki-createsim-url]: wiki/%5BAPI-Specifications%5D-Simulations#create-default-simulation
[docker-compose-install-url]: https://docs.docker.com/compose/install