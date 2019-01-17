<template>
    <div>
        <div class="loading-box">
          <loading :active.sync="isLoading" ></loading>
        </div>
        <!-- <scene v-if="previewLink" /> -->
        <router-view v-if="previewLink"/>
        <thumbnails v-if="!isLoading"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Thumbnails from 'components/Thumbnails.vue';
// import Scene from 'components/Scene.vue';

export default {
  name: 'home',
  methods: {
    init() {
      if (this.$route.params.id) {
        this.$store.dispatch('getData', this.$route.params.id);
      } else {
        this.$store.dispatch('getData', 'hola');
      }
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'doneData', 'previewLink']),
  },
  components: {
    Thumbnails,
    // Scene,
  },
  created() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.loading-box{
    display: flex;
    height: 50vh;
    justify-content: center;
    align-items: flex-end;
}
</style>
