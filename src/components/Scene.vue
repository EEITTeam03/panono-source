<template>
    <div>
        <a-scene>
          <a-assets timeout="60000">
            <img :id="activeId" :src="activeLink" crossorigin="anonymous">
          </a-assets>
          <a-sky id="image-360" src=""
          animation__fadein="startEvents:fadein;
          property:material.opacity;from:0.5;to:1;dur:1000;"
          animation__fadeout="startEvents:fadeout;
          property:material.opacity;from:1;to:0.5;dur:1000;">
          </a-sky>
        </a-scene>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Scene',
  methods: {
    askyLoading() {
      // 監聽 a-sky 是否 load 完
      document.querySelector('#image-360').addEventListener('materialtextureloaded', () => {
        // 取消 loading
        this.$store.dispatch('updateLoading', false);
        document.querySelector('#image-360').setAttribute('rotation', this.getRotation);
        // 加入漸進效果
        document.querySelector('#image-360').emit('fadein');
      });
    },
    imgLoading() {
      document.querySelector('a-assets > img').addEventListener('load', () => {
        console.log('start loading');
        this.$store.dispatch('updateLoading', false);
        document.querySelector('#image-360').setAttribute('src', `#${this.activeId}`);
        document.querySelector('#image-360').setAttribute('rotation', this.getRotation);
        document.querySelector('#image-360').emit('fadein');
        console.log('end loading');
      });
    },
  },
  computed: {
    ...mapGetters(['activeLink', 'getRotation', 'activeId']),
  },
  mounted() {
    // this.askyLoading();
    this.imgLoading();
  },
};
</script>
