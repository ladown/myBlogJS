export default class Component {
  constructor(id) {
    this.$el = document.querySelector(id);
    this.init();
  }

  init() {}

  hide() {
    this.$el.classList.add('hide');
    this.onHide();
  }

  show() {
    this.$el.classList.remove('hide');
    this.onShow();
  }

  onShow() {}

  onHide() {}
}
