# AngularChatApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.5.

## A learning experience

This is a learning project starting from the Message Centre of Coho.life, in order to get discover and get better at Angular.

### Things I want to do
[x] Mocking and Modeling
[x] Angular Services
[x] Angular Mat Theming and Components
[x] Switch to Dark mode
[x] Mock http requests with angular-in-memory-web-api
[x] Create new message
[x] Unread bubbles and mark unread
[x] Rework CRUD paths and use Mockoons to do the requests >
[x] Filters on Properties, with empty state
[ ] Pagination/Scroll for chat
[ ] Use routing for mobile views
[ ] i18n
[ ] Testing

## Mocking the Restful API

Since `angular-in-memory-web-api` had some limitation, I used (Mockoons)[https://mockoon.com] in order to mock the REST API. You will need to set it up for dev and demo purposes.

1. Download Mockoons
2. In Mockoons, instead of creating a new environement, click on the folder icon in order to open one.
2. In this repo, find src/assets/chat_app.json, and use it for the import in Mockoons.
3. You should now see 3 routes with CRUD operations, and 3 Data files: Users, Conversations and Properties. If this doesn't work, I stored the data for all 3 jsons in this repo, in src/assets/json_mocks. Follow the mockoons documentation to create 3 CRUD routes, using as Data the 3 json mocks in the repo.
4. Make sure this is running on localhost:3001/
5. Click on Start server, you're all set!

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
