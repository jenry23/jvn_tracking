<template>
  <sidebar-item-group :item="item" text sub-group></sidebar-item-group>
</template>

<script>
export default {
  name: 'SidebarItemSubGroup',
  props: {
    item: {
      type: Object,
      default: () => ({
        title: undefined,
        icon: undefined,
        path: {},
        children: []
      })
    }
  }
}
</script>
