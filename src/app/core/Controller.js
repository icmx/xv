class Controller {
  model;
  view;

  constructor({ model, view, childControllers }) {
    this.model = model;
    this.view = view;
    this.childControllers = childControllers;
  }

  start() {
    if (this.childControllers) {
      this.childControllers.forEach((controller) => {
        controller.start();
      });
    }
  }
}

export default Controller;
