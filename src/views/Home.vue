<template>
    <div>
        <loading :active.sync="isLoading" ></loading>
    </div>
</template>
<script>
export default {
  name: 'Home',
  methods: {
    init() {
      this.$http.get().then((response) => {
          
      });
    },
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  created() {
    this.init();
  },
}
</script>
