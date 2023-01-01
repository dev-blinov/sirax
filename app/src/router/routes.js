const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: ':symbol', name: 'symbol-view', component: () => import('pages/SymbolPage.vue') },
      { path: 'exchange-info', name: 'exchange-info', component: () => import('pages/ExchangeInfoPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
