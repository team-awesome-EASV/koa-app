
const routes = [
  {
    path: '/',
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/Home.vue') },
      { path: 'groups', component: () => import('../pages/Groups.vue') },
      { path: 'workshops', component: () => import('../pages/Workshops.vue') },
      { path: 'participants', component: () => import('../pages/Participants.vue') },
      { path: 'users', component: () => import('../pages/Users.vue') },
    ]
  },

  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
