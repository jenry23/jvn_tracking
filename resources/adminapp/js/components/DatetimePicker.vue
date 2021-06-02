<template>
  <input
    v-bind="$attrs"
    id="datepicker"
    :ref="ref"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.37/js/bootstrap-datetimepicker.min.js"></script>

<script>
export default {
  props: {
    picker: {
      type: String,
      default: 'datetime',
      validator: value => {
        let acceptedValues = ['datetime', 'date', 'time']
        return acceptedValues.indexOf(value) !== -1
      }
    }
  },
  computed: {
    ref: function () {
      return 'datetimepicker' + this._uid
    }
  },
  mounted() {
    let el = this.$refs[this.ref]
    let format = 'DD/MM/YYYY HH:mm:ss'
    
    if (this.picker === 'date') {
      format = 'DD/MM/YYYY'
    } else if (this.picker === 'time') {
      format = 'HH:mm:ss'
    }


    this.$jquery(el).datetimepicker({
      format: 'DD MMMM YYYY',
      icons: {
        time: 'fa fa-clock-o',
        date: 'fa fa-calendar',
        up: 'fa fa-chevron-up',
        down: 'fa fa-chevron-down',
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    })

    this.$jquery(el).on('dp.change', this.update)
  },
  beforeDestroy() {
    let el = this.$refs[this.ref]
    this.$jquery(el).off('dp.change', this.update)

  },
  methods: {
    update(event) {
      console.log(event);
      this.$emit('input', event)

    }
  }
}
</script>
