# ClRxbox

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

" npm link rx-lib cmn-lib" to link a dist file before this command the libraray module has to get build in a distributed options like below


create a global link for libraray
step1 : npm link . Execute this command in library folder to create a gloable link. This has to be executed in exact link directory

First, npm link in a package folder will create a symlink in the global folder {prefix}/lib/node_modules/<package> that links to the package where the npm link command was executed. (see npm-config for the value of prefix). It will also link any bins in the package to {prefix}/bin/{name}.

Next, in some other location, npm link package-name will create a symbolic link from globally-installed package-name to node_modules/ of the current folder.