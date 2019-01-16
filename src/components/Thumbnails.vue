<template>
  <div class="set-bottom">
    <ul class="bottom-bar" v-if="!isLoading">
      <li class="thumbnail-box"
      v-for="item in doneData"
      :key="item.index"
      @click="clickHandler(item)">
        <div class="inner">
          <div class="thumbnail"
          :style="{backgroundImage: `url(${item.thumbnail})`}"
          :class="{selected: item.objectId === activeId}">
          </div>
          <span>{{item.category}}</span>
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
    clickHandler(item) {
      this.$store.dispatch('changeSelectedId', item);
      this.$store.dispatch('changeSelectedUrl', item);
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
