import Component from '../core/component';
import TransformService from '../services/transformService';
import renderPost from '../templates/postTemplate';

import { apiService } from '../services/apiService';

export default class PostsComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }

  init() {
    this.$el.addEventListener('click', btnHandler.bind(this));
  }

  async onShow() {
    this.loader.show();
    const fbData = await apiService.fetchPosts();

    const posts = TransformService.fbObjToArr(fbData);

    const html = posts.map((post) => renderPost(post, { withButton: true })).join(' ');

    this.loader.hide();

    this.$el.insertAdjacentHTML('afterbegin', html);
  }

  onHide() {
    this.$el.innerHTML = ``;
  }
}

function btnHandler(event) {
  const id = event.target.dataset.id;
  const title = event.target.dataset.title;

  console.log(title);
  if (id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const candidate = favorites.find((item) => item.id === id);

    if (candidate) {
      event.target.textContent = 'Сохранить';
      event.target.classList.add('button-primary');
      event.target.classList.remove('button-danger');
      favorites = favorites.filter((p) => {
        return p.id !== id;
      });
    } else {
      event.target.textContent = 'Удалить';
      event.target.classList.remove('button-primary');
      event.target.classList.add('button-danger');
      favorites.push({ id, title });
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
