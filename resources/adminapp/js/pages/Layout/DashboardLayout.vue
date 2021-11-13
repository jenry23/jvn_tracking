<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <event-hub></event-hub>
    <side-bar :sidebarLinks="sidebarLinks">
      <mobile-menu slot="content"></mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <div class="content">
        <dashboard-content></dashboard-content>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardContent from './Content.vue'
import TopNavbar from './TopNavbar.vue'
import MobileMenu from './MobileMenu.vue'
import * as fb from '../../firebase'

export default {
  components: {
    DashboardContent,
    TopNavbar,
    MobileMenu
  },
  data() {
    return {
      sidebarLinks: [],
      sidebar: [
        {
          title: 'Maps',
          icon: 'map',
          path: { name: 'map_route.index' },
          gate: 'maps_access'
        },
        {
          title: 'Trip Ticket',
          icon: 'local_shipping',
          path: { name: 'tickets.index' },
          gate: 'trip_ticket_access'
        },
        {
          title: 'Drivers',
          icon: 'perm_contact_calendar',
          path: { name: 'driver_users.index' },   
          gate: 'drivers_access'
        },
        {
          title: 'Passengers',
          icon: 'people',
          path: { name: 'passenger_list.index' },
          gate: 'passenger_access'
        },
        {
          title: 'Vehicles',
          icon: 'drive_eta',
          path: { name: 'vehicle.index' },
          gate: 'vehicles_access'
        },
         {
          title: 'User Management',
          icon: 'import_contacts',
          path: { name: 'contact_management' },
          gate: 'user_mangement_access',
          children: [
            {
              title: 'Companies',
              icon: 'fas fa-building',
              path: { name: 'contact_companies.index' },
            },
            {
              title: 'Permission',
              icon: 'perm_data_setting',
              path: { name: 'permissions.index' },
            },
            {
              title: 'Roles',
              icon: 'group',
              path: { name: 'roles.index' },
            },
            {
              title: 'User',
              icon: 'person',
              path: { name: 'users.index' },
            }
          ]
        },
        {
          title: 'Create Routes',
          icon: 'satellite',
          path: { name: 'routes.index' },
          gate: 'routes_access'
        },
        {
          title: 'Create Pickup Points',
          icon: 'person_pin_circle',
          path: { name: 'location.index' },
          gate: 'location_access'
        }
      ]
    }
  },
   watch:{
    $route (to, from){
      if(to.name){
        this.$sidebar.showSidebar = false;        
      }
    }
  }, 
  mounted(){
    this.getUsersRoles();
    if(this.$route.name == 'dashboard'){
      this.$sidebar.showSidebar = true;
    }else{
      this.$sidebar.showSidebar = false;
    }
  },
  methods:{
     arr_diff (a1, a2) {
        var a = [], diff = [];
        var result = [];
        for (var i = 0; i < a1.length; i++) {
          a[a1[i].gate] = i;
        }
       for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                result[i] = a1[a[a2[i]]];
            }
        }
        console.log(result);
        var filtered = result.filter(function (el) {
          return el != null;
        });
        return filtered;
    },
    getUsersRoles()
    {
     fb.auth.onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          fb.usersCollection.doc(user.uid).get().then(response => {
            var data = response.data();
            if(data){
              var roles_id = data.roles;
              fb.rolesCollection.doc(roles_id).get().then(response =>{
                var permissions = response.data().permissions;
                var permissionsList = []
                permissions.forEach(element => {
                    permissionsList.push(element.title)
                });
                // var values = this.arr_diff(this.sidebar,permissionsList)
                this.sidebarLinks = this.sidebar;
              })
            }
          });
        } else {
          // User not logged in or has just logged out.
        }
      });
    }
  }
}



</script>
