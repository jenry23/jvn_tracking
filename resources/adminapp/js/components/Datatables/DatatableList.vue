<template>
  <div>
    <span
      class="badge badge-pill badge-azure mr-1"
      v-for="(item, key) in row[entry.key]"
      :key="key"
    >
    {{item}}
    </span>
  </div>
</template>

<script>
export default {
  props: ['field', 'row'],
  computed: {
    entry() {
      return {
        key: this.field,
      }
    }
  }
}
</script>

<style scoped>
.badge {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: none;
}
</style>
