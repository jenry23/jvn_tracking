import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const View = { template: '<router-view></router-view>' }

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@pages/Login.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@pages/Layout/DashboardLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@pages/Dashboard.vue'),
        meta: { title: 'global.dashboard' }
      },
      {
        path: 'trip-ticket',
        name: 'trip_ticket',
        component: View,
        redirect: { name: 'tickets.index' },
        children: [
          {
            path: 'tickets',
            name: 'tickets.index',
            component: () => import('@cruds/Tickets/Index.vue'),
            meta: { title: 'Ticket' }
          },
          {
            path: 'tickets/create',
            name: 'tickets.create',
            component: () => import('@cruds/Tickets/Create.vue'),
            meta: { title: 'Ticket' }
          },
          {
            path: 'tickets/:id/edit',
            name: 'tickets.edit',
            component: () => import('@cruds/Tickets/Edit.vue'),
            meta: { title: 'Ticket' }
          },
          {
            path: 'tickets/history',
            name: 'tickets.history',
            component: () => import('@cruds/Tickets/History.vue'),
            meta: { title: 'Ticket' }
          },
          {
            path: 'tickets/:id/scan',
            name: 'tickets.scan',
            component: () => import('@cruds/Tickets/Scan.vue'),
            meta: { title: 'Ticket' }
          },
          {
            path: 'tickets/:id/locations',
            name: 'tickets.locations',
            component: () => import('@cruds/Tickets/Location.vue'),
            meta: { title: 'Ticket' }
          },
          {
            path: 'tickets/:vehicle/:id',
            name: 'tickets.show',
            component: () => import('@cruds/Tickets/Show.vue'),
            meta: { title: 'Ticket' }
          },

        ]
      },
      {
        path: 'maps',
        name: 'maps',
        component: View,
        redirect: { name: 'map_route.index' },
        children: [
          {
            path: 'map-route',
            name: 'map_route.index',
            component: () => import('@cruds/MapRoute/Index.vue'),
            meta: { title: 'Maps' }
          },
          {
            path: 'map-route/create',
            name: 'map-route.create',
            component: () => import('@cruds/MapRoute/Create.vue'),
            meta: { title: 'Maps' }
          },
          {
            path: 'map-route/:id',
            name: 'map-route.show',
            component: () => import('@cruds/MapRoute/Show.vue'),
            meta: { title: 'Maps' }
          },
          {
            path: 'map-route/:id/edit',
            name: 'map-route.edit',
            component: () => import('@cruds/MapRoute/Edit.vue'),
            meta: { title: 'Maps' }
          },
        ]
      },

      {
        path: 'location',
        name: 'location',
        component: View,
        redirect: { name: 'location.index' },
        children: [
          {
            path: 'location',
            name: 'location.index',
            component: () => import('@cruds/Location/Index.vue'),
            meta: { title: 'Location' }
          },
          {
            path: 'location/create',
            name: 'location.create',
            component: () => import('@cruds/Location/Create.vue'),
            meta: { title: 'Location' }
          },
          {
            path: 'location/:id',
            name: 'location.show',
            component: () => import('@cruds/Location/Show.vue'),
            meta: { title: 'Location' }
          },
          {
            path: 'location/:id/edit',
            name: 'location.edit',
            component: () => import('@cruds/Location/Edit.vue'),
            meta: { title: 'Location' }
          },
        ]
      },

      {
        path: 'vehicle',
        name: 'vehicle',
        component: View,
        redirect: { name: 'vehicle.index' },
        children: [
          {
            path: 'vehicle',
            name: 'vehicle.index',
            component: () => import('@cruds/Vehicle/Index.vue'),
            meta: { title: 'Vehicle' }
          },
          {
            path: 'vehicle/create',
            name: 'vehicle.create',
            component: () => import('@cruds/Vehicle/Create.vue'),
            meta: { title: 'Vehicle' }
          },
          {
            path: 'vehicle/:id',
            name: 'vehicle.show',
            component: () => import('@cruds/Vehicle/Show.vue'),
            meta: { title: 'Vehicle' }
          },
          {
            path: 'vehicle/:id/edit',
            name: 'vehicle.edit',
            component: () => import('@cruds/Vehicle/Edit.vue'),
            meta: { title: 'Vehicle' }
          },

        ]
      },

      {
        path: 'passenger',
        name: 'passenger',
        component: View,
        redirect: { name: 'passenger_list.index' },
        children: [
          {
            path: 'passenger-list',
            name: 'passenger_list.index',
            component: () => import('@cruds/Passenger/Index.vue'),
            meta: { title: 'Passenger' }
          },
          {
            path: 'passenger-list/create',
            name: 'passenger_list.create',
            component: () => import('@cruds/Passenger/Create.vue'),
            meta: { title: 'Passenger' }
          },
          {
            path: 'passenger-list/:id',
            name: 'passenger_list.show',
            component: () => import('@cruds/Passenger/Show.vue'),
            meta: { title: 'Passenger' }
          },
          {
            path: 'passenger-list/:id/edit',
            name: 'passenger_list.edit',
            component: () => import('@cruds/Passenger/Edit.vue'),
            meta: { title: 'Passenger' }
          },
        ]
      },
      {
        path: 'driver',
        name: 'driver',
        component: View,
        redirect: { name: 'driver_users.index' },
        children: [
          {
            path: 'driver-users',
            name: 'driver_users.index',
            component: () => import('@cruds/DriverUsers/Index.vue'),
            meta: { title: 'Drivers' }
          },
          {
            path: 'driver-users/create',
            name: 'driver_users.create',
            component: () => import('@cruds/DriverUsers/Create.vue'),
            meta: { title: 'Drivers' }
          },
          {
            path: 'driver-users/:id',
            name: 'driver_users.show',
            component: () => import('@cruds/DriverUsers/Show.vue'),
            meta: { title: 'Drivers' }
          },
          {
            path: 'driver-users/:id/edit',
            name: 'driver_users.edit',
            component: () => import('@cruds/DriverUsers/Edit.vue'),
            meta: { title: 'Drivers' }
          },
        ]
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@cruds/Roles/Index.vue'),
        meta: { title: 'cruds.role.title' }
      },
      {
        path: 'roles/create',
        name: 'roles.create',
        component: () => import('@cruds/Roles/Create.vue'),
        meta: { title: 'cruds.role.title' }
      },
      {
        path: 'roles/:id',
        name: 'roles.show',
        component: () => import('@cruds/Roles/Show.vue'),
        meta: { title: 'cruds.role.title' }
      },
      {
        path: 'roles/:id/edit',
        name: 'roles.edit',
        component: () => import('@cruds/Roles/Edit.vue'),
        meta: { title: 'cruds.role.title' }
      },
      {
        path: 'route-list',
        name: 'route-list',
        component: View,
        redirect: { name: 'route.index' },
        children: [
        {
        path: 'routes',
        name: 'routes.index',
        component: () => import('@cruds/Routes/Index.vue'),
        meta: { title: 'Routes' }
          },
        {
          path: 'routes/create',
          name: 'routes.create',
          component: () => import('@cruds/Routes/Create.vue'),
          meta: { title: 'Routes' }
        },
        {
          path: 'routes/:id',
          name: 'routes.show',
          component: () => import('@cruds/Routes/Show.vue'),
          meta: { title: 'Routes' }
        },
        {
          path: 'routes/:id/edit',
          name: 'routes.edit',
          component: () => import('@cruds/Routes/Edit.vue'),
          meta: { title: 'Routes' }
        },
        ]
      },
      {
        path: 'contact-management',
        name: 'contact_management',
        component: View,
        children: [
          {
            path: 'contact-companies',
            name: 'contact_companies.index',
            component: () => import('@cruds/ContactCompanies/Index.vue'),
            meta: { title: 'Company' }
          },
          {
            path: 'contact-companies/create',
            name: 'contact_companies.create',
            component: () => import('@cruds/ContactCompanies/Create.vue'),
            meta: { title: 'Company' }
          },
          {
            path: 'contact-companies/:id',
            name: 'contact_companies.show',
            component: () => import('@cruds/ContactCompanies/Show.vue'),
            meta: { title: 'Company' }
          },
          {
            path: 'contact-companies/:id/edit',
            name: 'contact_companies.edit',
            component: () => import('@cruds/ContactCompanies/Edit.vue'),
            meta: { title: 'Company' }
          },
          {
            path: 'permissions',
            name: 'permissions.index',
            component: () => import('@cruds/Permissions/Index.vue'),
            meta: { title: 'Permissions' }
          },
          {
            path: 'permissions/create',
            name: 'permissions.create',
            component: () => import('@cruds/Permissions/Create.vue'),
            meta: { title: 'Permissions' }
          },
          {
            path: 'permissions/:id',
            name: 'permissions.show',
            component: () => import('@cruds/Permissions/Show.vue'),
            meta: { title: 'Permissions' }
          },
          {
            path: 'permissions/:id/edit',
            name: 'permissions.edit',
            component: () => import('@cruds/Permissions/Edit.vue'),
            meta: { title: 'Permissions' }
          },
          {
            path: 'roles',
            name: 'roles.index',
            component: () => import('@cruds/Roles/Index.vue'),
            meta: { title: 'Roles' }
          },
          {
            path: 'roles/create',
            name: 'roles.create',
            component: () => import('@cruds/Roles/Create.vue'),
            meta: { title: 'Roles' }
          },
          {
            path: 'roles/:id',
            name: 'roles.show',
            component: () => import('@cruds/Roles/Show.vue'),
            meta: { title: 'Roles' }
          },
          {
            path: 'roles/:id/edit',
            name: 'roles.edit',
            component: () => import('@cruds/Roles/Edit.vue'),
            meta: { title: 'Roles' }
          },
          {
            path: 'users',
            name: 'users.index',
            component: () => import('@cruds/Users/Index.vue'),
            meta: { title: 'Users' }
          },
          {
            path: 'users/create',
            name: 'users.create',
            component: () => import('@cruds/Users/Create.vue'),
            meta: { title: 'Users' }
          },
          {
            path: 'users/:id',
            name: 'users.show',
            component: () => import('@cruds/Users/Show.vue'),
            meta: { title: 'Users' }
          },
          {
            path: 'users/:id/edit',
            name: 'users.edit',
            component: () => import('@cruds/Users/Edit.vue'),
            meta: { title: 'Users' }
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


export default router
