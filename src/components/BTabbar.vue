<template>
  <tc-tabbar
    :dark="true"
    v-if="$store.getters.valid && !$store.getters.isDesktop"
  >
    <tc-tabbar-item
      icon="house-duo"
      title="Home"
      routeName="home"
      tfcolor="error"
    />
    <tc-tabbar-item
      icon="file-text"
      title="Clearing"
      routeName="clearing"
      tfcolor="error"
    />
    <tc-tabbar-item
      icon="gears"
      title="Options"
      routeName="options"
      tfcolor="error"
    />
  </tc-tabbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class BTabbar extends Vue {}
</script>
