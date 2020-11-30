// import authGuard from "./authGuard";
const routes = [
  {
    path: "/",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [
      { path: "/groups", component: () => import("../pages/Groups.vue") },
      {
        path: "/group/:groupId",
        name: "group",
        component: () => import("../pages/GroupView")
      },
      { path: "/workshops", component: () => import("../pages/Workshops.vue") },
      {
        path: "/participants",
        component: () => import("../pages/Participants.vue")
      },
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
        path: "/workshop-edit",
        props: true,
        component: () => import("../pages/EditWorkshop.vue")
      },

      //adminSettings
      {
        path: "/admin-settings",
        component: () => import("../pages/adminSettings.vue")
      }
    ],
    props: true,
    meta: {
      requiresAuth: true
    }
    // beforeEnter: authGuard
  },

  {
    path: "/login",
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
