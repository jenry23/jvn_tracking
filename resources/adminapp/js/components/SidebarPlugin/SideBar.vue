<template>
  <div
    class="sidebar"
    :data-background-color="backgroundColor"
    :data-image="backgroundImage"
    :data-color="itemColor"
  >
    <div class="logo">
      <a href="/" class=" logo-normal">
      <center>
        <img class="img-fluid" src="/images/logo_jvn.png">
        <h3 style="color:white;">JVN Tracking System</h3>
        </center>
      </a>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <ul class="nav">
        <slot>
          <template v-for="(item, i) in sidebarLinks">
            <sidebar-item-group
               v-if="item.children"
              :key="`group-${i}`"
              :item="item"
            >
            </sidebar-item-group>

            <sidebar-link v-else :key="`item-${i}`" :item="item"></sidebar-link>
          </template>
        </slot>
      </ul>

      <ul class="nav">
        <li class="nav-item">
          <a href="#" class="nav-link" @click.prevent="logout">
            <i class="material-icons">power_settings_new</i>
            <p>Logout</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="sidebar-background" :style="sidebarStyle"></div>
  </div>
</template>

<script>
import * as fb from '../../firebase'
export default {
  props: {
    title: {
      type: String,
      default: 'panel.site_title'
    },
    backgroundImage: {
      type: String,
      default: '/md/img/sidebar-1.jpg'
    },
    imgLogo: {
      type: String,
        default: '/images/mylittlenotebook.png'
    },
    backgroundColor: {
      type: String,
      default: 'black',
      validator: value => {
        let acceptedValues = ['', 'white', 'black']
        return acceptedValues.indexOf(value) !== -1
      }
    },
    itemColor: {
      type: String,
      default: 'purple',
      validator: value => {
        let acceptedValues = [
          '',
          'purple',
          'azure',
          'green',
          'orange',
          'rose',
          'danger'
        ]
        return acceptedValues.indexOf(value) !== -1
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      modules: []
    }
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`
      }
    }
  },
  methods: {
    logout() {
      fb.auth.signOut().then(() => location.assign('/'))
    },
  }
}
</script>

<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
}
</style>
