'use strict';

import HeaderComponent from './components/header';
import NavigationComponent from './components/navigation';
import CreateComponent from './components/create';
import FavoriteComponent from './components/favorite';
import PostsComponent from './components/posts';
import LoaderComponent from './components/loader';

window.addEventListener('DOMContentLoaded', () => {
  const loader = new LoaderComponent('#loader');

  const header = new HeaderComponent('#header');

  const navigation = new NavigationComponent('#navigation');

  const create = new CreateComponent('#create');

  const favorite = new FavoriteComponent('#favorite', { loader });

  const posts = new PostsComponent('#posts', { loader });

  navigation.registerTabs([
    { name: 'create', component: create },
    { name: 'posts', component: posts },
    { name: 'favorite', component: favorite },
  ]);
});
