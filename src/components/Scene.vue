<template>
    <div>
        <a-scene>
          <a-assets timeout="60000">
            <img id="origin" :src="activeLink" crossorigin='anonymous'>
            <img id="preview" :src="previewLink" crossorigin='anonymous'>
          </a-assets>
          <a-sky id="image-360" src=""
          :animation__rotate="rotateIn"
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
    imgLoading() {
      document.querySelector('#origin').addEventListener('load', () => {
        // console.log('start loading origin');
        document.querySelector('#image-360').setAttribute('src', '#origin');
        // console.log('end loading origin');
      });
    },
    previewLoading() {
      document.querySelector('#preview').addEventListener('load', () => {
        // console.log('start loading privew');
        document.querySelector('#image-360').setAttribute('position', this.getPosition);
        document.querySelector('#image-360').setAttribute('src', '#preview');
        if (document.querySelector('#origin').complete) {
          document.querySelector('#image-360').setAttribute('src', '#origin');
        }
        document.querySelector('#image-360').setAttribute('rotation', this.getRotation);
        // console.log('end loading privew');
      });
    },
    firstLoading() {
      // 第一張圖會滑進來
      document.querySelector('#image-360').addEventListener('materialtextureloaded', () => {
        this.$store.dispatch('updateLoading', false);
        document.querySelector('#image-360').emit('rotatein');
      }, { once: true });
    },
  },
  computed: {
    ...mapGetters(['activeLink', 'getRotation', 'previewLink', 'getPosition']),
    rotateIn() {
      return `startEvents:rotatein;property:rotation;from:90 0 0;to:${this.getRotation};dur:1500;`;
    },
  },
  mounted() {
    this.previewLoading();
    this.imgLoading();
    this.firstLoading();
  },
};
</script>
