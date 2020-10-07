// import authGuard from "./authGuard";
const routes = [
  {
    path: "/adminPage",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("../pages/Home.vue") },
      { path: "/groups", component: () => import("../pages/Groups.vue") },
      { path: "/workshops", component: () => import("../pages/Workshops.vue") },
      { path: "/participants", component: () => import("../pages/Participants.vue") },
      { path: "/users", component: () => import("../pages/Users.vue") },

      //adminShortcuts
      {
        path: "/create-group",
        props: true,
        component: () => import("../pages/CreateGroup.vue")
      },
      {
        path: "/create-workshop",
        props: true,
        component: () => import("../pages/CreateWorkshop.vue")
      },
      {
        path: "/group-finder",
        props: true,
        component: () => import("../pages/GroupFinder.vue")
      },
      {
        path: "/workshops-overview",
        props: true,
        component: () => import("../pages/WorkshopsOverview.vue")
      },

      //adminSettings
      { path: "/admin-settings", component: () => import("../pages/adminSettings.vue") },

    ],
    props: true,
    meta: {
      requiresAuth: true
    }
    // beforeEnter: authGuard
  },

  {
    path: "/",
    name: "Login",
    component: () => import("../pages/Authenticate")
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
