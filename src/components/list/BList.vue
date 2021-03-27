<template>
  <div class="b-list">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class BList extends Vue {}
</script>

<style lang="scss" scoped>
.b-list {
  padding: 5px;
  border-radius: $border-radius;
  background: $paragraph_dark;
}
</style>
