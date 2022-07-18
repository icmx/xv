export class Controller {
  model;
  view;

  constructor({ model, view, controllers }) {
    this.model = model;
    this.view = view;
    this.controllers = controllers;
  }

  start() {
    if (this.controllers) {
      this.controllers.forEach((controller) => {
        controller.start();
      });
    }
  }
}
