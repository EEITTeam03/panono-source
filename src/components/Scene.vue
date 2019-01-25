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
          property:material.opacity;from:1;to:0.5;dur:1000;"
          :animation__360="rotateY360">
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
        document.querySelector('#image-360').setAttribute('src', '#origin');
      });
    },
    previewLoading() {
      document.querySelector('#preview').addEventListener('load', () => {
        document.querySelector('#image-360').setAttribute('position', this.getPosition);
        document.querySelector('#image-360').setAttribute('src', '#preview');
        if (document.querySelector('#origin').complete) {
          document.querySelector('#image-360').setAttribute('src', '#origin');
        }
        // 繼續沿著Ｙ軸 360度旋轉
        if (!this.getRotateStatus) {
          document.querySelector('#image-360').emit('rotateY360Resume');
        }
      });
    },
    firstLoading() {
      // 第一張圖會滑進來
      document.querySelector('#image-360').addEventListener('materialtextureloaded', () => {
        this.$store.dispatch('updateLoading', false);
        document.querySelector('#image-360').emit('rotatein');
        // 沿著Ｙ軸 360度旋轉
        setTimeout(() => {
          this.$store.dispatch('changeRotateStatus', true);
          document.querySelector('#image-360').emit('rotateY360');
        }, 2500);
      }, { once: true });
    },
    pauseRotate() {
      document.addEventListener('click', () => {
        this.$store.dispatch('changeRotateStatus', false);
        document.querySelector('#image-360').emit('rotateY360Pause');
      });
    },
  },
  computed: {
    ...mapGetters(['activeLink', 'getRotation', 'previewLink', 'getPosition', 'getRotationY360', 'getRotateStatus']),
    rotateIn() {
      return `startEvents:rotatein;property:rotation;from:90 0 0;to:${this.getRotation};dur:1500;`;
    },
    rotateY360() {
      return `startEvents:rotateY360;pauseEvents:rotateY360Pause;resumeEvents:rotateY360Resume;property:rotation;from:${this.getRotation};to:${this.getRotationY360};dur:90000;loop:true;`;
    },
  },
  mounted() {
    // 監聽預覽圖 load
    this.previewLoading();
    // 監聽原圖 load
    this.imgLoading();
    // 監聽a-sky load
    this.firstLoading();
    // 監聽 click
    this.pauseRotate();
  },
};
</script>
