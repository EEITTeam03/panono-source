<template>
  <div class="set-bottom">
    <ul class="bottom-bar" v-if="!isLoading">
      <li class="thumbnail-box"
      v-for="{desktopUrl, thumbnail, objectId, index, category, panoramaRotation} in doneData"
      :key="index"
      @click="clickHandler(objectId, desktopUrl, panoramaRotation, index)">
        <div class="inner">
          <div class="thumbnail"
          :style="{backgroundImage: `url(${thumbnail})`}"
          :class="{selected: objectId === activeId}">
          </div>
          <span>{{category}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Thumbnails',
  computed: {
    ...mapGetters(['doneData', 'isLoading', 'activeId']),
  },
  methods: {
    clickHandler(objectId, desktopUrl, panoramaRotation, index) {
      this.$store.dispatch('changeSelectedId', { objectId });
      document.querySelector('#image-360').emit('fadeout');
      setTimeout(() => {
        this.$store.dispatch('changeSelectedUrl', { desktopUrl, panoramaRotation });
      }, 1000);
      //   this.$router.push(`/${this.$route.params.id}/${index}`);
      console.log(index);
    },
  },
};
</script>
<style lang="scss" scoped>
.set-bottom{
  background-color:rgba(80, 80, 80, 0.7);
  position: fixed;
  width:100%;
  bottom: 0;
}
.thumbnail{
  width: 165px;
  height: 88px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 165px 105px;
  border: 5px white solid;
  margin: auto;
  transition: background-size 0.5s;
  &:hover{
    background-size: 198px 126px;
    border-color: #f387a1;
  }
  &.selected{
    border-color: #ec0974
  }
}

.thumbnail-box {
  display:inline-block;
  position: relative;
  color: #fff;
  font-family: Arial;
  font-size: 24px;
  text-align: center;
  min-height: 100px;
  width: 180px;
  &:not(:last-child){
    margin-right: 5px
  }
}
.bottom-bar{
  list-style-type:none;
  overflow-x:auto;
  white-space: nowrap;
  margin-bottom: 0;
  padding-bottom: 1em;
  padding-inline-end: 40px;
}
</style>
