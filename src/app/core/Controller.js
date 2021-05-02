class Controller {
  model;
  view;

  constructor({ model, view, childControllers }) {
    this.model = model;
    this.view = view;
    this.childControllers = childControllers;
  }

  start() {
    this.childControllers.forEach((childController) => {
      childController.start();
    });
  }
}

export default Controller;
