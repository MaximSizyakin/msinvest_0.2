const routes = [
  {
    path: '/',
    component: () => {
      return import('layouts/MainLayout.vue');
    },
    children: [
      {path: '', name: 'IndexPage', component: () => import('pages/IndexPage.vue')},
      {path: '/imoex', name: 'IMOEXPage', component: () => import('pages/IMOEXPage.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
