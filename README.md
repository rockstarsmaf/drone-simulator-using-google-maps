# DroneMappingUsingGmaps

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

Simple website that simulates the drone motion on Google Maps based on user-provided information. Start position for your drone is your current location in the map, then move the following drone to the latitude and longitude provided by the user. The user also inputs the time in milliseconds, that is the time take by the drone to reach the destination.

Features:
1) Display world maps (you can use any of the map providers available) in your app background, you can use npm packages for the same.
2) Take latitude,longitude and time as input from the user. 
3) When a user clicks on the 'simulate' button, use Google map marker to display the drone and draw the entire expected path. Keep updating the drone position with time and also update the progress over the map.

Extra features:
1) Provide user functionality to pause/resume the simulation.
2) Give users the ability to simulate multiple drones in parallel.

`To simulate multiple drones, when in simulation mode add new user details and click on simulation. Number of times user submits data, that many drones are created and moved from current location to thier respective destination in the given time.`

## Install node_modules

Run `npm i` and the node modules file will be installed.

## Change Google maps API key for maps to load

In the `index.html` file, change `<script src="https://maps.googleapis.com/maps/api/js?key=test&libraries=places&language=en&callback=Function.prototype"></script>` key=test to actual API key for maps to load.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
