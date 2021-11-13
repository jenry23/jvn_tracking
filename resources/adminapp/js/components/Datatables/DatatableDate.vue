<template>
  <div>
    {{ row[field].toDate() }}
  </div>
</template>

<script>
export default {
  props: ['field', 'row']
}
</script>
