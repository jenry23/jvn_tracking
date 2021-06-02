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

export default {
  components: {
    DashboardContent,
    TopNavbar,
    MobileMenu
  },
  data() {
    return {
      sidebarLinks: [
        {
          title: 'Dashboard',
          icon: 'dashboard',
          path: { name: 'dashboard' }
        },
        {
          title: 'Trip Ticket',
          icon: 'local_shipping',
          path: { name: 'trip_ticket' },
          children: [{
              title: 'Ticket',
              icon: 'map',
              path: { name: 'tickets.index' },
            }]
        },
        {
          title: 'Maps',
          icon: 'map',
          path: { name: 'maps' },
          children: [{
              title: 'Maps',
              icon: 'map',
              path: { name: 'map_route.index' },
            }]
        },
        {
          title: 'Drivers',
          icon: 'perm_contact_calendar',
          path: { name: 'driver' },
          children: [{
              title: 'Drivers',
              icon: 'map',
              path: { name: 'driver_users.index' },
            }]
        },
        {
          title: 'Passengers',
          icon: 'people',
          path: { name: 'passenger' },
          children: [{
              title: 'Passenger',
              icon: 'perm_data_setting',
              path: { name: 'passenger_list.index' },
            }]
        },
        {
          title: 'Vehicles',
          icon: 'drive_eta',
          path: { name: 'vehicle' },
            children : [{
                title: 'Vehicles',
                icon: 'map',
                path: { name: 'vehicle.index' },
            }]
        },
        {
          title: 'Location',
          icon: 'person_pin_circle',
          path: { name: 'location' },
          children: [{
              title: 'cruds.location.title',
              icon: 'map',
              path: { name: 'location.index' },
            }]
        },
        {
          title: 'cruds.userManagement.title',
          icon: 'person',
          path: { name: 'user_management' },
          gate: 'user_management_access',
          children: [
            {
              title: 'cruds.permission.title',
              icon: 'perm_data_setting',
              path: { name: 'permissions.index' },
              gate: 'permission_access'
            },
            {
              title: 'cruds.role.title',
              icon: 'group',
              path: { name: 'roles.index' },
              gate: 'role_access'
            },
            {
              title: 'cruds.user.title',
              icon: 'person',
              path: { name: 'users.index' },
              gate: 'user_access'
            }
          ]
        },
        {
          title: 'cruds.contactManagement.title',
          icon: 'import_contacts',
          path: { name: 'contact_management' },
          gate: 'contact_management_access',
          children: [
            {
              title: 'cruds.contactCompany.title',
              icon: 'fas fa-building',
              path: { name: 'contact_companies.index' },
              gate: 'contact_company_access'
            },
            {
              title: 'cruds.contactContact.title',
              icon: 'fas fa-user-plus',
              path: { name: 'contact_contacts.index' },
              gate: 'contact_contact_access'
            }
          ]
        },
        {
          title: 'cruds.settings.title',
          icon: 'settings',
          path: { name: 'settings' },
          gate: 'settings_access',
          children: []
        },
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
    if(this.$route.name == 'dashboard'){
      this.$sidebar.showSidebar = true;
    }else{
      this.$sidebar.showSidebar = false;
    }
  }
}



</script>
