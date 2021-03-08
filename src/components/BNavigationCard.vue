<template>
  <router-link v-if="to" :to="to" class="boerse-navigation-card">
    <div class="icon">
      <i huge error :class="'ti-' + icon" />
    </div>
    <div class="title">{{ title }}</div>
    <div class="subtitle">{{ subtitle }}</div>
  </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Location } from 'vue-router';

@Component
export default class BNavigationCard extends Vue {
  @Prop() icon!: string;
  @Prop() title!: string;
  @Prop() subtitle!: string;
  @Prop() to!: Location;
}
</script>

<style lang="scss" scoped>
.boerse-navigation-card {
  text-decoration: none;
  color: inherit;

  background-color: $color;
  background-image: url('/assets/navigation-card-bg.png');
  background-position: top right;
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: $border-radius;
  padding: 20px;

  .title {
    font-weight: bold;
    text-transform: uppercase;
    margin: 10px 0;
  }
  .subtitle {
    opacity: 0.5;
    transition: 0.2s ease-in-out;
    font-size: 14px;
  }

  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.0174);
    .subtitle {
      opacity: 0.75;
    }
  }
}
</style>
