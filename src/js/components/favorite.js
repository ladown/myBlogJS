import Component from '../core/component';
import renderPost from '../templates/postTemplate';

import { apiService } from '../services/apiService';

export default class FavoriteComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }

  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this));
  }

  async onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));

    const html = renderList(favorites);

    this.$el.insertAdjacentHTML('afterbegin', html);
  }

  onHide() {
    this.$el.innerHTML = ``;
  }
}

function renderList(list = []) {
  if (list && list.length) {
    return `
    <ol>
      ${list
        .map((item) => {
          return `
        <li>
          <a href='#' class='js-link' data-id='${item.id}'>
            ${item.title}
          </a>
        </li>`;
        })
        .join('')}
    </ol>
    `;
  }

  return `<p class='center'>Вы пока не добавили ничего в избранное</p>`;
}

async function linkClickHandler(event) {
  event.preventDefault();

  if (event.target.classList.contains('js-link')) {
    const postId = event.target.dataset.id;

    this.$el.innerHTML = ``;

    this.loader.show();

    const post = await apiService.fetchPostById(postId);

    this.loader.hide();

    this.$el.insertAdjacentHTML('afterbegin', renderPost(post, { withButton: false }));
  }
}
